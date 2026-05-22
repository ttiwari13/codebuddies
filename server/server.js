const {WebSocketServer}=require('ws');
const wss=new WebSocketServer({port:8080});
const clients=[]; // stores all connected clients
wss.on('connection',(socket)=>{
    console.log('A user is connected');
    clients.push(socket); //add the new client to the clients array
    socket.on('message',(message)=>{
        console.log(message.toString());
        clients.forEach((client)=>{
            if(client!==socket){
                client.send(message.toString());
            }
        });
    });
});
console.log('listening on port 8080');