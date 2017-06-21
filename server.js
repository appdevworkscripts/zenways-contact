var express=require('express');
var app=express();
var PORT=process.env.PORT || 8080;
var http=require('http').Server(app);
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
//mongodb://myuser:myuser@ds131492.mlab.com:31492/contacts
mongoose.connect('mongodb://myuser:myuser@ds131492.mlab.com:31492/contacts');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, key");
    next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
require('./app/routes-config')(app);
app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
http.listen(PORT, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('listening on *:'+PORT);
    }  
});
   