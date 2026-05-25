import app from './firebase.js';
import {
    getAuth,
    signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
const auth = getAuth(app);
const loginBtn =
document.getElementById('login');
loginBtn.addEventListener('click',()=>{
    const email =
    document.getElementById('email').value;
    const password =
    document.getElementById('password').value;
    signInWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then((userCredential)=>{
        alert('Login successful');
        console.log(userCredential.user);
        window.location.href = '/room.html';

    })
    .catch((error)=>{
        alert(error.message);

    });
});