/* global firebase */
/* eslint no-loop-func: 0, guard-for-in: 0 */
(function (g) {
    const coHash = {};

    document.getElementById('attainment').innerHTML = g.attainment;
    document.getElementById('attainmentx').innerHTML = g.attainment;
    document.getElementById('attainmenty').innerHTML = g.attainment;

    document.getElementById('attainstud3').innerHTML = g.attainstud3;
    document.getElementById('attainstud2').innerHTML = g.attainstud2;
    document.getElementById('attainstud1').innerHTML = g.attainstud2;
    document.getElementById('attainstud0').innerHTML = g.attainstud3;

    document.getElementById('analysis-total').innerHTML = g.analysis.total;
    document.getElementById('analysis-pass').innerHTML = g.analysis.pass;
    document.getElementById('analysis-fail').innerHTML = g.analysis.fail;

    let str = `<button><a href=marks.html>Back to marks</a>
                </button>&nbsp;&nbsp;<button id='printpdf'>Generate PDF</button>
                <span class=noprint><span id='print-error'></span>
                (${g.cy}-${g.year}-${g.branch}-${g.div}-${g.sem}-${g.iat}.pdf on Desktop)</span>`;

    const mon1 = g.sem.split('').pop() % 2 ? 'July' : 'Jan';
    const mon2 = g.sem.split('').pop() % 2 ? 'Dec' : 'June';

    str += `<b><center>Jaypee Institute of  Information Tchnology<br>
                A-10, Sector-62, Noida, Uttar Pradesh 201309.<br><br>
                ${g.branch ? `${g.branch} Department` : ''}<br>
                Mapping of Course Outcome with Marks obtained in ${g.iat}</center></b><br>
                ACADEMIC SESSION - ${mon1} ${g.cy} to ${mon2} ${g.cy} <span style="padding: 0 85px;">
                FACULTY NAME: ${g.teacher}</span>
                SUBJECT: 	${g.sub} <br><br>
                CLASS :  ${g.year} ${g.branch} ${g.div} <span style="padding: 0 85px;">
                SEMESTER: ${g.sem}</span><br>`;

    str += `<br><table border=1><tr>
              <th>Roll no</th>
              <th>Names</th>`;

    // Save PDF
    function printPDF(ev) {
        const remote = require('electron').remote;

        ev.preventDefault();
        document.getElementById('print-error').innerHTML = '';
        remote.getCurrentWindow().webContents.printToPDF({ printBackground: true, landscape: true }, (error, data) => {
            if (error) {
                document.getElementById('print-error').innerHTML = error;
                return;
            }
            require('fs').writeFile(`${remote.getGlobal('desktopPath')}/${g.cy}-${g.year}-${g.branch}-${g.div}-${g.sem}-${g.iat}.pdf`, data, error => {
                if (error) {
                    document.getElementById('print-error').innerHTML = error;
                    return;
                }
                document.getElementById('print-error').innerHTML = '<span class=success>PDF saved succesfully!</span>';
                document.getElementById('printpdf').removeEventListener('click', printPDF);
                document.getElementById('printpdf').style.display = 'none';
            });
        });
    }

    // get CO Mapping
    firebase.database().ref(`${g.cy}/${g.sem}/CO/${g.iat}/${g.sub}`).orderByKey()
        .once('value').then(snapshot => {
            const quest = snapshot.val();

            for (const q in quest) {
                const p = quest[q];
                coHash[p] = coHash[p] ? coHash[p].concat(q) : [q];
            }
            console.log(coHash);
            for (const co in coHash) {
                if (co === '-1') {
                    str += `<th colspan=${coHash[co].length + 2}>NA`;
                }
                else str += `<th colspan=${coHash[co].length + 3}>CO${co}`;
            }

            str += `<th colspan="3">Total</th></tr>
                <tr><td></td>
                <td></td>`;

            for (const co in coHash) {
                coHash[co].forEach(quest => {
                    str += `<td>Q${quest}</td>`;
                });
                str += '<th><b>Marks <br>Obtained</th><th>Total <br>Marks</th>'
                if (co !== '-1') str += `<th>Attainment<br>of CO${co}</th>`;
            }

            str += `<th>Exam Score</th><th>Marks Obtained</th> <th>Total Marks</th>
                <tr><td></td><td>Max marks --> </td>`;

            for (const co in coHash) {
                coHash[co].forEach(quest => {
                    str += `<td>${quest.split('')[0] === '1' ? '2' : '5'}</td>`;
                });
                if (co === '-1') str += `<th></th><th></th>`;
                else str += `<th></th><th></th><th></th>`;
            }
            str += `<th></th><th></th><th></th>`;
            doStudent();
        });

    // get student list
    function doStudent() {
        const attain = {};
        const total = {};
        for (const co in coHash) {
            attain[co] = {
                0: 0, 40: 0, 60: 0
            };
            total[co] = 0;
        }

        let attStr = '';

        firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`)
            .orderByChild('roll').once('value').then(snapshot => {
                snapshot.forEach(child => {
                    const p = child.val();

                    if (!p.marks || !p.marks[g.sub] || !p.marks[g.sub][g.iat]) {
                        return;
                    }
                    const marks = p.marks[g.sub][g.iat];
                    let totalObtained = 0;
                    let totalAttempt = 0;
                    let finalObtained = 0;
                    var final = 0;
                    let a = 0;
                    let b = 0;
                    let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0, c6 = 0;
                    let d = 0;
                    str += `<tr>
                          <td>${p.roll}</td>
                          <td style="text-align:left">${p.name}</td>`;

                    for (const co in coHash) {
                        let coTotalObtained = 0;
                        let coTotalAttempt = 0;
                        let cofinalObtained = 0;

                        final = 0;
                        coHash[co].forEach(quest => {
                            if (marks[quest] === '-1') {
                                str += `<td>NA</td>`;
                            } else {
                                if (quest === "2a") {
                                    a = parseFloat(marks[quest]);

                                }
                                if (quest === "2b" && marks[quest] > a) {
                                    a = parseFloat(marks[quest]);
                                }

                                if (quest === "3a") {
                                    b = parseFloat(marks[quest]);
                                }
                                if (quest === "3b" && marks[quest] > b) {
                                    b = parseFloat(marks[quest]);
                                }
                                if (quest === "1a") {
                                    c1 = parseFloat(marks[quest]);
                                }
                                if (quest === "1b") {
                                    c2 = parseFloat(marks[quest]);
                                }
                                if (quest === "1c") {
                                    c3 = parseFloat(marks[quest]);
                                }
                                if (quest === "1d") {
                                    c4 = parseFloat(marks[quest]);
                                }
                                if (quest === "1e") {
                                    c5 = parseFloat(marks[quest]);
                                }
                                if (quest === "1f") {
                                    c6 = parseFloat(marks[quest]);
                                }
                                if (quest === "4") {
                                    d = parseFloat(marks[quest]);

                                }
                                if (c1 <= c2 && c1 <= c3 && c1 <= c4 && c1 <= c5 && c1 <= c6)
                                    final = Math.ceil(a + b + c2 + c3 + c4 + c5 + c6 + d);
                                else if (c2 <= c1 && c2 <= c3 && c2 <= c4 && c2 <= c5 && c2 <= c6)
                                    final = Math.ceil(a + b + c1 + c3 + c4 + c5 + c6 + d);
                                else if (c3 <= c1 && c3 <= c2 && c3 <= c4 && c3 <= c5 && c3 <= c6)
                                    final = Math.ceil(a + b + c1 + c2 + c4 + c5 + c6 + d);
                                else if (c4 <= c1 && c4 <= c2 && c4 <= c3 && c4 <= c5 && c4 <= c6)
                                    final = Math.ceil(a + b + c1 + c2 + c3 + c5 + c6 + d);
                                else if (c5 <= c1 && c5 <= c2 && c5 <= c3 && c5 <= c4 && c5 <= c6)
                                    final = Math.ceil(a + b + c1 + c2 + c3 + c4 + c6 + d);
                                else if (c6 <= c1 && c6 <= c2 && c6 <= c3 && c6 <= c4 && c6 <= c5)
                                    final = Math.ceil(a + b + c1 + c2 + c3 + c4 + c5 + d);
                                str += `<td>${marks[quest]}</td>`;
                                coTotalObtained += parseFloat(marks[quest], 10);
                                coTotalAttempt += quest.split('')[0] === '1' ? 2 : 5;
                            }

                        });

                        totalAttempt += coTotalAttempt;
                        totalObtained += coTotalObtained;
                        total[co]++;

                        let classn;
                        const attainment = parseFloat((coTotalObtained / coTotalAttempt * 100).toFixed(2));
                        if (isNaN(attainment)) {
                            classn = 'wheat';
                            coTotalObtained = 'NA';
                            coTotalAttempt = 'NA';
                            total[co]--;
                        } else if (attainment >= g.attainment) {
                            attain[co]['60']++;
                            classn = 'green';
                        } else {
                            attain[co]['0']++;
                            classn = 'red';
                        }
                        str += `<th>${coTotalObtained}</th><th>${coTotalAttempt}</th>`;
                        if (co !== '-1') str += `<th class="${classn}">${attainment}</th>`;
                    }

                    str += `<th>${final}</th><th>${totalObtained}</th><th>${totalAttempt}</th>`;
                });
                document.getElementById('output').innerHTML = str;
                document.getElementById('printpdf').addEventListener('click', printPDF);

                for (const co in coHash) {
                    if (co === '-1') continue;
                    let level = 1;
                    if ((100 / total[co] * parseFloat(attain[co]['60']).toFixed(2)) >= g.attainstud3) {
                        level = 3;
                    } else if ((100 / total[co] * parseFloat(attain[co]['60']).toFixed(2)) >= g.attainstud2) {
                        level = 2;
                    }
                    attStr += `<div>&nbsp;&nbsp;&nbsp;<b>For CO${co}:<br>
                        <div style="width:200px; border: 1px solid black; margin: 10px;">
                            <div class=green style="height:30px; width:${200 / total[co] * attain[co]['60']}px">
                                &nbsp;${(100 / total[co] * attain[co]['60']).toFixed(2)}%
                            </div>
                            <div class=red style="height:30px; width:${200 / total[co] * attain[co]['0']}px">
                                &nbsp;${(100 / total[co] * attain[co]['0']).toFixed(2)}%
                            </div>
                        </div> &nbsp;&nbsp;&nbsp;Attainment: ${level}</div><br>`;
                }
                document.getElementById('coout').style.columnCount = Object.keys(coHash).length;
                document.getElementById('coout').innerHTML = attStr;

                if (Object.keys(coHash).length > 5) {
                    const sheet = window.document.styleSheets[0];
                    sheet.insertRule('table, body {font-size: 8px;}', sheet.cssRules.length);
                }
            });
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Category', 'Count'],
            ['> 80%', g.analysis.e1],
            ['70% - 79.99%', g.analysis.e2],
            ['55% - 69.99%', g.analysis.e3],
            ['40.01% - 54.99%', g.analysis.e4],
            ['0% - 40%', g.analysis.e5]
        ]);

        var options = {
            title: 'Marks category analysis',
            pieHole: 0.2,
            pieSliceText: 'value',
            is3D: true
        };

        var data2 = google.visualization.arrayToDataTable([
            ['Category', 'Count'],
            ['Pass', g.analysis.pass],
            ['Fail', g.analysis.fail]
        ]);

        var options2 = {
            title: 'Pass/Fail analysis',
            pieHole: 0.2,
            pieSliceText: 'value',
            is3D: true
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        var chart2 = new google.visualization.PieChart(document.getElementById('donutchart2'));

        chart.draw(data, options);
        chart2.draw(data2, options2);
    }
})(JSON.parse(sessionStorage.getItem('Minor')));
