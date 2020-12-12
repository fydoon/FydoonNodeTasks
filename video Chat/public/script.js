const socket = io('/');
const videoGrid = document.getElementById('video-grid');

const myPeer = new Peer(undefined,{
    host: '/',
    port: '3001'
});

// when video connected
const myVideo = document.createElement('video')
myVideo.muted = true
//const peers = {}
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream=>{
    addVideoStream(myVideo,stream)
    myPeer.on('call',call=>{
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream',userVideostream=>{
            addVideoStream(video, userVideostream)
        });
    });
    socket.on('user-connected:', userId=>{
        connectToNewUser(userId, stream)
    });
});
socket.on('user-disconnected',userId =>{
    console.log(userId);
    //if(peers[userId])peers[userId].close()  
});

// when server connected
myPeer.on('open', id => {
   socket.emit('join-room', ROOM_ID, id)
});

//when user connected
// socket.on('user-connected', userId =>{
//     console.log('user connected: ' + userId)
// });

// connect to new user 
function connectToNewUser(userId,stream){
    const call = myPeer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream',userVideostream =>{
        addVideoStream(video,userVideostream)
    })
    call.on('close',()=>{
        video.remove()
    })

    //peers(userId)= call
};

// adding video strem to user
function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    });
    videoGrid.append(video)
  };
