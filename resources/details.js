/* global firebase */

(function () {
    function gi(id) {
        return document.getElementById(id);
    }

    // Some wierd race condition
    const teacher = window.setInterval(() => {
        if (firebase.auth().currentUser) {
            document.getElementById('teacher').value = firebase.auth().currentUser.displayName;
            window.clearInterval(teacher);
        } else {
            console.warn('User not found');
        }
    }, 200);

        gi('year').addEventListener('change', function () {
        const fe = document.getElementsByClassName('yesfe');
        const notfe = document.getElementsByClassName('nofe');
        const f = document.getElementsByClassName('f');
        const s = document.getElementsByClassName('s');
        const t = document.getElementsByClassName('t');
        const b = document.getElementsByClassName('b');
        const it3 = document.getElementsByClassName('it3');
        const it4 = document.getElementsByClassName('it4');
        const it5 = document.getElementsByClassName('it5');
        const it6 = document.getElementsByClassName('it6');
        const it7 = document.getElementsByClassName('it7');
        const it8 = document.getElementsByClassName('it8');


        if (this.value === 'FE') {
            gi('div').value = '1';
            gi('sem').value = '1';

            gi('branch').parentNode.style.visibility = 'hidden';
            document.querySelectorAll('label[for="branch"]')[1].style.display = 'none';

            [].forEach.call(fe, e => {
                e.style.display = 'block';
            });
            [].forEach.call(notfe, e => {
                e.style.display = 'none';
            });

            [].forEach.call(f, e => {
                e.style.display = 'block';
            });
            [].forEach.call(s, e => {
                e.style.display = 'none';
            });
            [].forEach.call(t, e => {
                e.style.display = 'none';
            });
            [].forEach.call(b, e => {
                e.style.display = 'none';
            });
        } else {
            gi('div').value = 'A';

            gi('branch').parentNode.style.visibility = 'visible';
            document.querySelectorAll('label[for="branch"]')[1].style.display = '';

            [].forEach.call(fe, e => {
                e.style.display = 'none';
            });
            [].forEach.call(notfe, e => {
                e.style.display = 'block';
            });
        }

        if (this.value === 'SE') {

            gi('sem').value = '3';
            gi('sub').value = 'Applied Mathematics-III';

            [].forEach.call(f, e => {
                e.style.display = 'none';
            });
            [].forEach.call(s, e => {
                e.style.display = 'block';
            });
            [].forEach.call(t, e => {
                e.style.display = 'none';
            });
            [].forEach.call(b, e => {
                e.style.display = 'none';
            });
           
            [].forEach.call(it3, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });

 gi('sem').addEventListener('change', function () {
           
            if( this.value === '4')
            {
            gi('sub').value = 'Applied Mathematics-IV';
            [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });
            }
            else
            {
            gi('sub').value = 'Applied Mathematics-III';
            [].forEach.call(it3, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });
            }
        });
}

        if (this.value === 'TE') {
            gi('sem').value = '5';
            gi('sub').value = 'Computer Graphics & Virtual Reality';

            [].forEach.call(f, e => {
                e.style.display = 'none';
            });
            [].forEach.call(s, e => {
                e.style.display = 'none';
            });
            [].forEach.call(t, e => {
                e.style.display = 'block';
            });
            [].forEach.call(b, e => {
                e.style.display = 'none';
            });

            [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });

            gi('sem').addEventListener('change', function () {
            
            if( this.value === '6')
            {
            gi('sub').value = 'Software Engineering';
             [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });
            }
            else
            {
            gi('sub').value = 'Computer Graphics & Virtual Reality';
            [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });
            }
        });

        }

        if (this.value === 'BE') {
            gi('sem').value = '7';
            gi('sub').value = 'Software Project Management';
            [].forEach.call(f, e => {
                e.style.display = 'none';
            });
            [].forEach.call(s, e => {
                e.style.display = 'none';
            });
            [].forEach.call(t, e => {
                e.style.display = 'none';
            });
            [].forEach.call(b, e => {
                e.style.display = 'block';
            });

            [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });

  gi('sem').addEventListener('change', function () {
           
            if( this.value === '8')
            {
            gi('sub').value = 'Storage Network Management & Retrieval';
            [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'block';
            });
            }
            else
            {
            gi('sub').value = 'Software Project Management';
            [].forEach.call(it3, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it4, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it5, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it6, e => {
                e.style.display = 'none';
            });
            [].forEach.call(it7, e => {
                e.style.display = 'block';
            });
            [].forEach.call(it8, e => {
                e.style.display = 'none';
            });
            }
        });

        }
    }, false);



    document.forms[0].addEventListener('submit', e => {
        e.preventDefault();
        const g = {
            cy: gi('cy').value,
            sem: `Sem ${gi('sem').value}`,
            iat: `${gi('iat').value}`,
            sub: gi('sub').value,
            year: gi('year').value,
            branch: gi('branch').value,
            div: gi('div').value,
            teacher: gi('teacher').value,
            attainment: gi('attainment').value,
			attainstud3: gi('attainstud3').value,
			attainstud2: gi('attainstud2').value
        };

        if (g.year === 'FE') {
            g.branch = g.div; // no branch for FE
        }

        sessionStorage.setItem('Minor', JSON.stringify(g));

        // check if CO available
        document.getElementById('throbber').style.display = 'inline';
        firebase.database().ref(`${g.cy}/${g.sem}/CO/${g.iat}/${g.sub}`)
         .once('value').then(snapshot => {
             if (snapshot.exists()) {
                 firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`)
                  .once('value').then(snap => {
                      if (snap.exists()) {
                          window.location.href = 'marks.html';
                      } else {
                          window.location.href = 'xlsupload.html';
                      }
                  });
             } else {
                 window.location.href = 'co.html';
             }
         })
		 .catch(err => {
            document.getElementById('throbber').style.display = 'none';
            document.getElementById('error').innerHTML = `Error: ${err.message}`;
        });
    });
})();
