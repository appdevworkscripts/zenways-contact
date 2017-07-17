var email = require("emailjs");
var app = require('express').Router();
var Contact = require('../model/contact');
var server = email.server.connect({
    user: "testuserzencon@gmail.com",
    password: "Abcd#12345",
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
        from: "Contact Email Service <testuserzencon@gmail.com>",
        to: req.body.to,
        subject: req.body.subject,
        attachment:[
            {data:"<html>"+req.body.text + '<br /><br /><br /><br /><br /><strong><small>Key used : '+req.user_id+"</small><br /><p style='font-size:9px;'>Please do not use this service for illegal use. We are tracking your activities through the key provided to you.</p></strong></html>", alternative:true},
        ]
    }, function (err, message) {
        err ? res.send({status:false,error:err}) : res.send({status:true,message:message});
    });
})
module.exports = app;
