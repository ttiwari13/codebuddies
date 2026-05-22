const {WebSocketServer}=require('ws');
const wss=new WebSocketServer({port:8080});
const clients=[]; // stores all connected clients
wss.on('connection',(socket)=>{
    console.log('A user is connected');
    clients.push(socket); //add the new client to the clients array
    socket.on('message',(message)=>{
        console.log(message.toString());
        const data=JSON.parse(message.toString());
        console.log(data);
        if(data.type==='join'){
            socket.roomId=data.roomId;
            console.log(`User joined room ${data.roomId}`);
        }
        clients.forEach((client)=>{
            if(client!==socket){
                if(client.roomId===data.roomId){
                  client.send(message.toString());
                }
            }
        });
    });
    socket.on('close',()=>{
      console,log('disconnected');
      const index=clients.indexOf(socket);
      if(index!==-1){
        clients.splice(index,1);  //array.splice(startIndex, deleteCount)
      }
    });
});
console.log('listening on port 8080');