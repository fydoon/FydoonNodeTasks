const express = require("express");
const path = require("path");  
const app = express();
const routes = require('./routes/routes.js')

//route paths
app.get('/',routes)
app.post('/register',routes)
app.get('/register',routes)

//log in
app.get('/login',routes)
app.post('/login',routes)

app.get('/success',routes)
app.get('/logout',routes)
app.post('/addmsg',routes)
//forgot password
app.get('/forgotpassword',routes)
app.post('/forgotpassword',routes)
app.get('/reset',routes)
app.post('/reset',routes)
//ejs path files templates 
app.set('view engine','ejs')
app.set('views', path.join(__dirname, "views"));



//app.get('/',(req,res)=>{res.send("hii im stared")});
//sever
const PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>console.log('server started  port', PORT)); 