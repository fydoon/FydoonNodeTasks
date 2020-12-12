const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
    },
    address:{
    type:String,
    },
    phone: {
        type:Number,
        
    },
    date: {
        type:Date,
        default:Date.now
    },
    restToken:String,
    expireToken:Date,
    messages: [{
        type: String,
    }]
});

module.exports = new mongoose.model('client', userschema);