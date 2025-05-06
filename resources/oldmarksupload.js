/* global XLS, firebase, FileReader */
/* eslint guard-for-in: 0, radix: 0, no-loop-func: 0 */
(function (g) {
    // data on top of page
    document.getElementById('display-year').innerHTML = g.year;
    document.getElementById('display-branch').innerHTML = g.branch;
    document.getElementById('display-div').innerHTML = g.div;
    document.getElementById('display-cy').innerHTML = g.cy;
    document.getElementById('display-sem').innerHTML = g.sem;

    const oFileIn = document.getElementById('my_file_input');
    let file;
    let data;
    const rollMap = {};
    // const students = {};

    // get needed data
    firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`)
        .orderByChild('roll').once('value').then(snapshot => {
            let p;
            snapshot.forEach(child => {
                p = child.val();
                rollMap[p.roll] = p.pid;
            });
        }).then(() => console.log('done'));

    oFileIn.addEventListener('change', filePicked, false);
    document.forms[0].addEventListener('submit', submit);

    function filePicked(oEvent) {
        file = oEvent.target.files[0];
        document.getElementById('added').innerHTML = `File added! (${oEvent.target.files[0].name})`;
    }

    function submit(e) {
        e.preventDefault();
        document.getElementById('throbber').style.display = 'inline';
        document.getElementById('error').innerHTML = '';

        // Get The File From The Input
        const oFile = file;
        // Create A File Reader HTML5
        const reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {
            data = e.target.result;
            const cfb = XLS.CFB.read(data, {
                type: 'binary'
            });

            const wb = XLS.parse_xlscfb(cfb);

            // Loop Over Each Sheet TODO: Remove this loop
            wb.SheetNames.forEach((sheetName, num) => {
                if (num !== 0) {
                    return;
                }

                // Obtain The Current Row As CSV
                data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {
                    range: parseInt(document.getElementById('header-row').value) - 1
                });

                let items = Object.keys(data).length;
                console.log(items);
                for (const indexR in data) {
                    const current = data[indexR];

                    const formattedData = {};

                    for (const i in current) {
                        const anew = i.replace(/(Q|\.|\s)/g, '');
                        formattedData[anew] = current[i];

                        if (!formattedData[anew] || isNaN(formattedData[anew])) {
                            formattedData[anew] = '-1';
                        }
                        if (!(/[1-3][a-f]/.test(anew)) && anew !== '4') {
                            delete formattedData[anew];
                        }
                        console.log('anew', anew);
                    }
                    if (rollMap[current['Roll No.']]) {
                        // fill in missing data if any by -1
                        for (let i = 1; i <= 3; ++i) { // 3 questions
                            if (i === 1) { // Q1
                                'abcdef'.split('').forEach(e => { // each sub question
                                    formattedData[i + e] = formattedData[i + e] || '-1';
                                });
                            } else { // Q2, Q3
                                'ab'.split('').forEach(e => { // each sub question
                                    formattedData[i + e] = formattedData[i + e] || '-1';
                                });
                            }
                        }
                        console.log('sending for ', rollMap[current['Roll No.']], ' ', formattedData);
                        firebase.database()
                            .ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}/${rollMap[current['Roll No.']]}/marks/${g.sub}/${g.iat}/`)
                            .update(formattedData)
                            .then(() => {
                                if (--items < 3) {
                                    document.getElementById('throbber').style.display = 'none';
                                    window.location.href = 'marks.html';
                                }
                            }).catch(err => {
                                document.getElementById('throbber').style.display = 'none';
                                document.getElementById('error').innerHTML = `Error: ${err.message}`;
                            });
                    } else {
                        --items;
                    }
                }
            });
        };

        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFile);
    }
})(JSON.parse(sessionStorage.getItem('Minor')));
