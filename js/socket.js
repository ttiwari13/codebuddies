const socket=new WebSocket('ws://localhost:8080'); // stores live connection object
const editor=document.getElementById('editor');
socket.onopen=()=>{
    console.log('Connected to the server');

};
editor.addEventListener('input',()=>{
       socket.send(editor.value);
});
socket.onmessage=(event)=>{
    editor.value=event.data; 
    console.log('Message from server:',event.data);
};