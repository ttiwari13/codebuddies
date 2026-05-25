import app from './firebase.js';

import {
    getAuth,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
const startBtn = document.getElementById('start');
const copyBtn = document.getElementById('copy');
const auth = getAuth(app);
const logoutBtn = document.getElementById('logout');
onAuthStateChanged(auth,(user)=>{
    if(user){
        console.log('User logged in');
        startBtn.addEventListener('click',()=>{
            const roomId = crypto.randomUUID();
            const interviewerLink =
            `/editor.html?room=${roomId}&role=interviewer`;
            const candidateLink =
            `http://localhost:3000/editor.html?room=${roomId}&role=candidate`;
            document.getElementById('link').innerText =
            candidateLink;
            setTimeout(()=>{
                window.location.href = interviewerLink;
            },3000);
        });
    }
    else{
        window.location.href = '/login.html';
    }
});
logoutBtn.addEventListener('click',()=>{
    signOut(auth)
    .then(()=>{
        alert('Logged out');
        window.location.href = '/login.html';
    })
    .catch((error)=>{

        alert(error.message);
    });
});
copyBtn.addEventListener('click',()=>{
    const link =
    document.getElementById('link').innerText;
    navigator.clipboard.writeText(link);
    alert('Link copied!');
});
