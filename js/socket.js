import app from './firebase.js';
import {
    getAuth,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
const socket=new WebSocket('ws://localhost:8080'); // stores live connection object
const params= new URLSearchParams(window.location.search);
const roomId=params.get('room');
const questionEdit=document.getElementById('question');
const codeEdit=document.getElementById('code');
const role=params.get('role');
const auth = getAuth(app);
onAuthStateChanged(auth,(user)=>{
    if(user){
    socket.onopen=()=>{
      socket.send(JSON.stringify({
        type:'join',
        roomId
    }))
    console.log('Connected to the server');
  };
   let lastsent=0;
   const delay=500;
//taking input from candidate and sending to server
   if(role==='candidate'){
    questionEdit.disabled=true;
    codeEdit.addEventListener('input',()=>{
       const now=Date.now();
       if(now-lastsent>=delay){
          socket.send(JSON.stringify({
            roomId,
            type:'code',
            value:codeEdit.value
         }));
         lastsent=now;
       }
    });
   }
  if(role==='interviewer'){
    codeEdit.disabled=true;
    questionEdit.addEventListener('input',()=>{
       const now = Date.now();
       if(now-lastsent>=delay){
          socket.send(JSON.stringify({ //Send data from client → server
            roomId,
            type: 'question',
            value: questionEdit.value
         }));
         lastsent=now;
       }
    });
    }
//server sends data to client
    socket.onmessage=(event)=>{
    const data = JSON.parse(event.data);
    if(data.type==='code'
       && codeEdit.value!==data.value){
        codeEdit.value = data.value;
    }
    if(data.type==='question'
       && questionEdit.value!==data.value){
        questionEdit.value = data.value;
    }
    console.log('Message from server:',event.data);
    };
    }
    else{
        window.location.href = '/login.html';
    }
});
