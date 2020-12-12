
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

// view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))


//get request
app.get('/', (req,res)=>{
    res.redirect(`/${uuidV4()}`)

});
//dynamic roo allocation
app.get('/:room', (req,res) => {
    res.render('room', { roomId : req.params.room })    
})

// connectiong to the room 
io.on('connection',socket =>{
     socket.on('join-room',(roomId,userId)=>{
         console.log(roomId,userId)
         socket.join(roomId)
         socket.to(roomId).broadcast.emit('user-connected', userId)

         socket.on('disconnect',()=>{
             socket.to(roomId).broadcast.emit('user-disconnected', userId)
         })
     })

 })
//sever
const PORT = process.env.PORT|3000;
server.listen(PORT, ()=>console.log(`Server Running at Port ${PORT}...!`)); 