const {WebSocketServer}=require('ws');
const wss=new WebSocketServer({port:8080});

wss.on('connection',(socket)=>{
    console.log('A user is connected');
})
console.log('listening on port 8080');