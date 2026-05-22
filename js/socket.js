const socket=new WebSocket('ws://localhost:8080'); // stores live connection object
const questionEdit=document.getElementById('question');
const codeEdit=document.getElementById('code');
const role='candidate';
socket.onopen=()=>{
    console.log('Connected to the server');

};
let lastsent=0;
const delay=500;
if(role==='candidate'){
    questionEdit.disabled=true;
    codeEdit.addEventListener('input',()=>{
       const now=Date.now();
       if(now-lastsent>=delay){
          socket.send(JSON.stringify({
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
          socket.send(JSON.stringify({
            type: 'question',
            value: questionEdit.value
         }));
         lastsent=now;
       }
    });
}
socket.onmessage=(event)=>{
    const data=JSON.parse(event.data);
    if(data.type==='code'){
        codeEdit.value=data.value;
    }
    if(data.type==='question'){
        questionEdit.value=data.value;
    }
    console.log('Message from server:',event.data);
};