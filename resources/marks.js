/* jsint loopfunc: true no-implicit-coercion: false */
/* global firebase */
/* eslint no-loop-func: 0, guard-for-in: 0, array-callback-return: 0 */
(function (g) {
    // data on top of page
    document.getElementById('display-sub').innerHTML = g.sub;

    let pid = 0;
    const finalData = {};
    const metaData = {};

    // get needed data
    firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`)
        .orderByChild('roll').once('value').then(snapshot => {
            let str = '';
            let p;
            let i = 1;
            snapshot.forEach(child => {
                p = child.val();
                str += ` <li>
                        <a class="mdl-navigation__link student" id="${i++}" href="marks.html"
                            data-pid="${p.pid}" data-name="${p.name}" data-roll="${p.roll}">
                          <i class="material-icons mdl-list__item-avatar">person</i>
                          &nbsp;&nbsp;${p.name}
                          <i class="material-icons" style="display:${p.marks && p.marks[g.sub] && p.marks[g.sub][g.iat] ? 'inline' : 'none'};">done</i>
                        </a>
                        </li>`;
                metaData[p.pid] = {
                    name: p.name,
                    roll: p.roll
                };
                if (p.marks && p.marks[g.sub] && p.marks[g.sub][g.iat]) {
                    finalData[p.pid] = p.marks[g.sub][g.iat];
                }
            });
            console.log('init', finalData);
            document.getElementById('o1').innerHTML = str;
            document.getElementsByClassName('student')[0].classList.add('active-now');
            handleClick();
            document.getElementsByClassName('student')[0].click();
        });

    function setValue() {
        let val;

        for (let i = 1; i <= 4; ++i) { // 3 questions
            if (i === 1) { // Q1
                'abcdef'.split('').forEach(e => { // each sub question
                    val = finalData[pid] ? finalData[pid][i + e] : -1;
                    document.getElementById(`option-${i + e}`).value = val;
                });
            } else { // Q2, Q3
                'ab'.split('').forEach(e => { // each sub question
                    val = finalData[pid] ? finalData[pid][i + e] : -1;
                    document.getElementById(`option-${i + e}`).value = val;
                });
            }
        }
        val = finalData[pid] ? finalData[pid]['4'] : -1;
        document.getElementById(`option-4`).value = val;
    }

    function next() {
        const cur = document.getElementsByClassName('active-now')[0];
        cur.getElementsByTagName('i')[1].style.display = 'inline';
        const Id = parseInt(cur.id, 10);
        if (!(Id % 7)) { // Try smooth scroll instead
            document.getElementById(Id).scrollIntoView({
                behavior: 'smooth'
            });
            window.scrollTo(0, 0);
        }
        document.getElementById(Id + 1).click();
    }

    // click on left bar item
    function handleClick() {
        [].forEach.call(document.getElementsByClassName('student'), v => {
            v.addEventListener('click', function (e) {
                e.preventDefault();
                document.getElementsByClassName('active-now')[0].classList.remove('active-now');
                this.classList.add('active-now');
                pid = document.getElementById('display-pid').textContent = this.dataset.pid;
                document.getElementById('display-name').textContent = this.dataset.name;

                setValue();
                document.getElementById('option-1a').focus();
                document.getElementById('option-1a').select();
                document.getElementById('option-1a').parentNode.classList.add('is-focused');
            });
        });
    }

    // click Save Button
    document.forms[0].addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('error').innerHTML = '';
        document.getElementById('throbber').style.display = 'inline';

        finalData[pid] = {};
        for (let i = 1; i <= 4; ++i) { // 3 questions
            if (i === 1) { // Q1
                'abcdef'.split('').forEach(e => { // each sub question
                    finalData[pid][i + e] = document.getElementById(`option-${i + e}`).value;
                });
            } else { // Q2, Q3
                'ab'.split('').forEach(e => { // each sub question
                    finalData[pid][i + e] = document.getElementById(`option-${i + e}`).value;
                });
            }
        }
        finalData[pid]['4'] = document.getElementById(`option-4`).value;
        console.log('saving', finalData);
        firebase.database()
            .ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}/${pid}/marks/${g.sub}/${g.iat}`)
            .update(finalData[pid])
            .then(() => {
                document.getElementById('throbber').style.display = 'none';
                next();
            }).catch(err => {
                document.getElementById('throbber').style.display = 'none';
                document.getElementById('error').innerHTML = `Error: ${err.message}`;
            });
    });

    // All Done
    document.getElementById('alldone').addEventListener('click', e => {
        e.preventDefault();
        analysis();
        window.location.href = 'table.html';
    });

    function round(a, p) {
        p = p || 10;
        return parseFloat(a.toFixed(p));
    }

    // Highest marks
    function analysis () {

        const q = [];
        const tempData = {};
        const analysis = {
            total: 0,
            pass: 0,
            fail: 0,
            e1: 0,
            e2: 0,
            e3: 0,
            e4: 0,
            e5: 0
        };

        for (const p in finalData) {
            tempData[p] = {};

            for (let i = 1; i <= 4; ++i) { // 3 questions
                tempData[p][i] = 0;
                q[i] = [];
                if (i === 1) { // Q1
                    'abcdef'.split('').forEach(e => { // each sub question
                        finalData[p][i + e] = finalData[p][i + e] || '-1';
                        q[i].push(finalData[p][i + e] === '-1' ? 0 : parseFloat(finalData[p][i + e], 10));
                    });
                } else { // Q2, Q3
                    'ab'.split('').forEach(e => { // each sub question
                        finalData[p][i + e] = finalData[p][i + e] || '-1';
                        q[i].push(finalData[p][i + e] === '-1' ? 0 : parseFloat(finalData[p][i + e], 10));
                    });
                }

                // remove least and sum
                q[i].sort().shift();
                tempData[p][i] = q[i].reduce((a, b) => {
                    return round(a + b, 1);
                }, 0);
            }
            tempData[p].total = Math.round(tempData[p][1] + tempData[p][2] + tempData[p][3] + tempData[p][4]);

            analysis.total++;
            if (tempData[p].total >= 16) 
                analysis.e1++;
            else if (tempData[p].total >= 14 && tempData[p].total < 16) 
                analysis.e2++;
            else if (tempData[p].total >= 11 && tempData[p].total < 14) 
                analysis.e3++;
            else if (tempData[p].total >= 8 && tempData[p].total <11)
                analysis.e4++;
            else 
                analysis.e5++;

            if (tempData[p].total >= 8) 
                analysis.pass++;
            else 
                analysis.fail++;
        }

        let currStorage = g;
        currStorage['analysis'] = analysis;
        sessionStorage.setItem('Minor', JSON.stringify(currStorage));
    }

    // search
    document.getElementById('search').onkeyup = function () {
        const filter = this.value.toUpperCase();
        const lis = document.getElementsByTagName('li');
        for (let i = 0; i < lis.length; i++) {
            if (lis[i].getElementsByClassName('student').length) {
                const name = lis[i].getElementsByClassName('student')[0].dataset.name;
                if (name.toUpperCase().indexOf(filter) > -1) {
                    lis[i].style.display = 'list-item';
                } else {
                    lis[i].style.display = 'none';
                }
            }
        }
    };
})(JSON.parse(sessionStorage.getItem('Minor')));
