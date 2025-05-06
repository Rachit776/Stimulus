/* jshint loopfunc: true */
/* global firebase */

(function() {
    var config = {
        apiKey: "AIzaSyDWLnXQwRR-kmvSwlWxgt_TX2F_uEDjHlk",
        authDomain: "minor-1709364961391.firebaseapp.com",
        databaseURL: "https://minor-1709364961391-default-rtdb.firebaseio.com",
        storageBucket: "minor-1709364961391.appspot.com",
    };
    firebase.initializeApp(config);
}());

// DOMContentLoaded ensures the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Example: Add your UI logic here
    const submitBtn = document.querySelector("#submitBtn"); // adjust ID as needed
    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            const name = document.querySelector("#nameInput").value; // adjust ID as needed
            firebase.database().ref("users").push({ name });
            alert("Data submitted: " + name);
        });
    }

    // Add more event listeners as needed for other features
});

(function (g) {
    // data on top of page
    document.getElementById('display-iat').innerHTML = g.iat;
    document.getElementById('display-sem').innerHTML = g.sem;
    document.getElementById('display-cy').innerHTML = g.cy;
    document.getElementById('display-sub').innerHTML = g.sub;

    // Button to Add CO columns
    let j = 3;
    let p = 19;
    let flag = 0;

    document.getElementById('adder').addEventListener('click', () => {
        document.getElementById('adder').value = ++j;
        for (let k = 1; k < 16; k++) {
            const divi = document.getElementById(`t${k}`).getElementsByTagName('td');
            const divi1 = document.getElementById(`t${k}`).getElementsByTagName('th');
            const divi2 = document.getElementById('d1');
            const divi3 = document.getElementById('d2');
            const divi4 = document.getElementById('d3');
			const divi5 = document.getElementById('d4');
            for (let i = 0; i < divi.length; i++) {
                if (divi[i].className === `co${j}`) {
                    divi[i].style.display = 'table-cell';
                }
            }
            if (flag === 0) {
                p += 337;
            }

            for (let i = 0; i < divi1.length; i++) {
                if (divi1[i].className === `co${j
                    
                }`) {
                    divi1[i].style.display = 'table-cell';
                    divi2.style.width = `${p}px`;
                    divi3.style.width = `${p}px`;
                    divi4.style.width = `${p}px`;
					divi5.style.width = `${p}px`;
                    p += 21.7;
                    flag = 1;
                }
            }
        }
    });

    // returns selected radio value
    function getRadio(elemName) {
        const rates = document.getElementsByName(elemName);
        let rateValue;

        for (let i = 0; i < rates.length; ++i) {
            if (rates[i].checked) {
                rateValue = rates[i].value;
            }
        }
        return rateValue;
    }
    
    // attach on form submit
    document.forms[0].addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('throbber').style.display = 'inline';
        document.getElementById('error').innerHTML = '';
        const coMap = {};

        for (let i = 1; i <= 3; ++i) { // 3 questions
            if (i === 1) { // Q1
                'abcdef'.split('').forEach(e => { // each sub question
                    coMap[i + e] = getRadio(`option-${i + e}`);
                });
            } else { // Q2, Q3
                'ab'.split('').forEach(e => { // each sub question
                    coMap[i + e] = getRadio(`option-${i + e}`);
                });
            }
        }
		coMap['4'] = getRadio(`option-4`);

        // send data to db and submit after save
        try {
            firebase.database().ref(`${g.cy}/${g.sem}/CO/${g.iat}/${g.sub}`).update(coMap).then(() => {
                firebase.database().ref(`${g.cy}/${g.sem}/Students/${g.year}/${g.branch}/${g.div}`)
                .once('value').then(snap => {
                    if (snap.exists()) {
                        window.location.href = 'marks.html';
                    } else {
                        window.location.href = 'xlsupload.html';
                    }
                });
            }).catch(err => {
                // Handle Errors here.
                document.getElementById('throbber').style.display = 'none';
                document.getElementById('error').innerHTML = `Error: ${err.message}`;
            });
        } catch (err) {
            document.getElementById('throbber').style.display = 'none';
            document.getElementById('error').innerHTML = 'Error: Some values are incomplete';
        }
    });
})(JSON.parse(sessionStorage.getItem('Minor')));
