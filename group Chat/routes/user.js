const users = [];

//join user to chat
function userJoin (id, username, room) {
    const user = { id, username, room};
    users.push(user);  
    return user;
};

//get current user
function getCurrentUser(id){
    return users.find(user =>user.id === id);
};
//leave user from chat
function leaveUser(id){
    const leave = users.findIndex(user=>user.id===id);
    
    if(leave !== -1){
        return users.splice(leave,1)[0];
    }
}
// get room users
function getRoomUsers(room){
    return users.filter(user=>user.room === room);
}

module.exports={ userJoin, getCurrentUser,leaveUser,getRoomUsers };