/* global XLS, firebase, FileReader */
/* eslint guard-for-in: 0, radix: 0 */

(function (g) {
    // data on top of page
    document.getElementById('display-year').innerHTML = g.year;
    document.getElementById('display-branch').innerHTML = g.branch;
    document.getElementById('display-div').innerHTML = g.div;
    document.getElementById('display-cy').innerHTML = g.cy;
    document.getElementById('display-sem').innerHTML = g.sem;

    if (window.location.search.search('marks') > -1) {
        document.getElementById('msg').innerHTML = `NOTE: WE ALREADY SEEM TO HAVE A STUDENT LIST FILE FOR SPECIFIED DETAILS.<br>
                                                    UPLOADING ANOTHER WILL DELETE ALL CURRENT DATA FROM THAT LIST<br>
                                                    <a href=marks.html>CLICK HERE</a> TO ENTER MARKS FOR CURRENT LIST<br><br><br>`;
    }
    const oFileIn = document.getElementById('my_file_input');
    let data;
    const formattedData = {};
    // const students = {};

    oFileIn.addEventListener('change', filePicked, false);

    function filePicked(oEvent) {
        // Get The File From The Input
        const oFile = oEvent.target.files[0];
            // Create A File Reader HTML5
        const reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {
            data = e.target.result;
            const cfb = XLS.CFB.read(data, {type: 'binary'});
            const wb = XLS.parse_xlscfb(cfb);

             // Loop Over Each Sheet TODO: Remove this loop
            wb.SheetNames.forEach((sheetName, num) => {
                if (num !== parseInt(document.getElementById('sheet-no').value) - 1) {
                    return;
                }

                 // Obtain The Current Row As CSV
                data = XLS.utils.sheet_to_json(wb.Sheets[sheetName], {
                    range: parseInt(document.getElementById('header-row').value) - 1
                });

                let sRow = `<tr>
                            <th class="mdl-data-table__header--sorted-ascending mdl-data-table__cell--non-numeric">Roll</th>
                            <th class="mdl-data-table__cell--non-numeric">PID</th>
                            <th class="mdl-data-table__cell--non-numeric">Name</th></tr>`;
                let aclass = '';
                for (const indexR in data) {
                    const current = data[indexR];
                    for (const indexC in current) {
                        if (indexC === 'Name') { // Cleanup Names
                            current[indexC] = current[indexC].replace(/[^ a-z]/gi, ''); // remove non-characters
                            current[indexC] = current[indexC].replace(/ (M|F) ?$/, ''); // Gender
                            aclass = 'mdl-data-table__cell--non-numeric';
                        }

                        sRow += `<td class='${aclass}'>${current[indexC]}</td>`;
                        aclass = '';
                    }
                    sRow += '</tr>';

                    // store data in proper format using PID
                    // students[current['PID No.']] = {};
                    // students[current['PID No.']].marks = '';

                    formattedData[current['PID No.']] = {
                        name: current.Name,
                        roll: parseInt(current['Roll No.'], 10),
                        pid: parseInt(current['PID No.'], 10)
                    };
                }
                document.getElementById(`my_file_output`).innerHTML = sRow;
            });
        };

        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFile);

        // final submission
        document.forms[0].addEventListener('submit', e => {
            e.preventDefault();
            document.getElementById('throbber').style.display = 'inline';
            document.getElementById('error').innerHTML = '';

            // send data to db and submit after save

            try {
                // The global student list
/* firebase.database().ref('Students').update(formattedData).then(() => {
                    // The current year branch student list
                    */
                if (window.location.search.search('marks') > -1) {
                    firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`).remove();
                }

                firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`)
                .update(formattedData).then(() => {
                    window.location.href = 'marks.html';
                }).catch(err => {
                        // Handle Errors here.
                    document.getElementById('throbber').style.display = 'none';
                    document.getElementById('error').innerHTML = `Error: ${err.message}`;
                });
/* }).catch(err => {
                    // Handle Errors here.
                    document.getElementById('throbber').style.display = 'none';
                    document.getElementById('error').innerHTML = `Error: ${err.message}`;
                });*/
            } catch (err) {
                document.getElementById('throbber').style.display = 'none';
                document.getElementById('error').innerHTML = `${err}`;
            }
        });
    }
})(JSON.parse(sessionStorage.getItem('Minor')));
