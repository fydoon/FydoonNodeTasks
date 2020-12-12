const express = require("express");
const socketio = require('socket.io')
const path = require('path');
const http = require('http');
const formatMessage = require('./routes/messages');
const {userJoin,getCurrentUser,leaveUser,getRoomUsers} = require('./routes/user');


const app = express();

const server = http.createServer(app);
const io = socketio(server);
//static folder path
app.use(express.static(path.join(__dirname, 'public')));

const admin = 'Admin';

//user 
io.on('connection', socket =>{
    //join room
    socket.on('joinRoom',({username,room})=>{
        const user = userJoin(socket.id, username,room);
        socket.join(user.room);
        //console.log('dgsgsrgsg');

        // when user connected to chat
        socket.emit('message',formatMessage(admin, `welcome to the group chat`));

        //broadcast message to all users
        socket.broadcast.to(user.room).emit('message',formatMessage(admin,`${user.username} Has Joined The Chat`));
         //users and room info
         io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        });
    });
     //listen from 
     socket.on('chatMessage', (msg)=>{
        const user = getCurrentUser(socket.id)
        //console.log(msg);
        io.to(user.room).emit('message',formatMessage(user.username, msg))

     });
     // when users disconnecd
     socket.on('disconnect',()=>{
        const user = leaveUser(socket.id);
        if(user){
            io.to(user.room).emit('message',formatMessage(admin,`${user.username} Has Left The Chat`));
            //users and room info
            io.to(user.room).emit('roomUsers',{
                 room:user.room,
                users:getRoomUsers(user.room)
            });
        }
     });
});


//server 
const PORT = 9000 || process.env.PORT;
server.listen(PORT,()=> console.log(`Server is Running at Port: ${PORT}...!`));