/* global firebase */

document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();

    document.getElementById('error').innerHTML = '';
    document.getElementById('throbber').style.display = 'inline';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        user.updateProfile({
            displayName: document.getElementById('name').value
        }).then(() => {
            user.sendEmailVerification().then(() => {
                this.submit();
            });
        });
    }).catch(err => {
    // Handle creation Errors here.
        document.getElementById('throbber').style.display = 'none';
        document.getElementById('error').innerHTML = `Error: ${err.message}`;
    });
});
