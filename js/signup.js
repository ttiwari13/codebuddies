import app from './firebase.js';
import {
    getAuth,
    createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
const auth = getAuth(app);
const signupBtn = document.getElementById('signup');
signupBtn.addEventListener('click',()=>{
    const email =
    document.getElementById('email').value;
    const password =
    document.getElementById('password').value;
    createUserWithEmailAndPassword(
        auth,
        email,
        password
    )
    .then((userCredential)=>{
        alert('Signup successful');
        console.log(userCredential.user);
    })
    .catch((error)=>{

        alert(error.message);
    });

});