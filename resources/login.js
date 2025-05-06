/* global firebase */

// authenticate using firebase
document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('error').innerHTML = '';
    document.getElementById('throbber').style.display = 'inline';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        if (user.emailVerified) {
            this.submit();
        } else {
            document.getElementById('error').innerHTML =
            'Your email address has not been verified yet. Check your inbox for the verification mail (<a href=# id=resend>RESEND</a>)';
            document.getElementById('resend').addEventListener('click', () => {
                user.sendEmailVerification().then(() => {
                    window.location.href = 'login.html';
                });
            });
            document.getElementById('throbber').style.display = 'none';
        }
    }, error => {
        // Handle Errors here.
        document.getElementById('throbber').style.display = 'none';
        document.getElementById('error').innerHTML = `Error: ${error.message}`;
    });
});

// Show Forgot password
document.getElementById('fp').addEventListener('click', () => {
    document.getElementById('error').innerHTML = ''; // Remove error
    document.getElementById('form1').style.display = 'none'; // Login form
    document.getElementById('form2').style.display = 'block'; // password form
    document.getElementById('info1').innerHTML = 'RESET PASSWORD'; // title
});
document.forms[1].addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('error').innerHTML = '';
    document.getElementById('throbber').style.display = 'inline';

    const email = document.getElementById('email2').value;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
        this.submit();
    }, error => {
        // Handle Errors here.
        document.getElementById('throbber').style.display = 'none';
        document.getElementById('error').innerHTML = `Error: ${error.message}`;
    });
});
