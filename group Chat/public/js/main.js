
const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// get data from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();
//join chat
socket.emit('joinRoom',{ username, room });

//get room and users
socket.on('roomUsers', ({ users,room})=>{
    outputRoomName(room);
    outputUsers(users);
})



//message srom server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

    //scroll down 
    chatMessage.scrollTop = chatMessage.scrollHeight;
});

//message submission
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    // get msg from text
    const msg = e.target.elements.msg.value;
    
    //emit msg to server
    socket.emit('chatMessage',msg);

    //clear input msg field
    e.target.elements.msg.value =''; 
    e.target.elements.msg.focus();

});
//out put to Dom 
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div);
}
//add room and users to dom
function outputRoomName(room){
    roomName.innerText = room;
};
//add  users to dom
function outputUsers(users){
    userList.innerHTML = `${users.map( user => `<li> ${user.username} </li>`).join('')}`;
}