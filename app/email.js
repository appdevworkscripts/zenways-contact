var email = require("emailjs");
var app = require('express').Router();
var Contact = require('../model/contact');
var server = email.server.connect({
    user: "testuserdmt@gmail.com",
    password: "Testuserdmt_1234",
    host: "smtp.gmail.com",
    port: 465,
    ssl: true
});
var getUserId = function (req, res, next) {
    if (req.headers.key) {
        req.user_id = req.headers.key;
        next()
    } else {
        res.send({
            error: 'No Key was passed',
            status: false
        })
    }

}
app.post('/secure_email', getUserId, (req, res) => {
    server.send({
        text: '',
        from: "Contact Email Service <testuserdmt@gmail.com>",
        to: req.body.to,
        subject: req.body.subject,
        attachment:[
            {data:"<html>"+req.body.text + '<br /><br /><br /><br /><br /><strong><small>Key used : '+req.user_id+"</small></strong></html>", alternative:true},
        ]
    }, function (err, message) {
        err ? res.send({status:false,error:err}) : res.send({status:true,message:message});
    });
})
module.exports = app;
