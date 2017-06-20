var app = require('express').Router();
var Contact = require('../model/contact');
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
app.get('/contacts', getUserId, function (req, res) {
    Contact.find({
        active: true,
        user_id: req.user_id
    }, function (err, contacts) {
        if (err) {
            res.send({
                error: err,
                status: false
            })
        } else {
            res.send({
                contacts: contacts,
                status: true
            })
        }
    })
});
app.get('/contact/:id', getUserId, function (req, res) {
    Contact.findOne({
        active: true,
        _id: req.params.id,
        user_id: req.user_id
    }, function (err, _contact) {
        if (err) {
            res.send({
                error: err,
                status: false
            })
        } else {
            res.send({
                contact: _contact,
                status: true
            })
        }
    })
});
app.post('/contact', getUserId, function (req, res) {
    var contact = req.body;
    console.log(req.body);
    contact.user_id = req.user_id;
    contact.active = true;
    contact.createdOn = new Date();
    contact.updatedOn = contact.createdOn;
    Contact.create(contact, function (err, _contact) {
        if (err) {
            res.send({
                error: err,
                status: false
            })
        } else {
            res.send({
                contact: _contact,
                status: true
            })
        }
    })
});
app.put('/contact/:id', getUserId, function (req, res) {
    var contact = req.body;
    contact.updatedOn = new Date();
    Contact.findOneAndUpdate({
        active: true,
        _id: req.params.id,
        user_id: req.user_id
    }, {
        $set: contact
    }, function (err, _contact) {
        if (err) {
            res.send({
                error: err,
                status: false
            })
        } else {
            res.send({
                contacts: _contact,
                status: true
            })
        }
    })
});
app.delete('/contact/:id', getUserId, function (req, res) {
    Contact.findOneAndUpdate({
        active: true,
        _id: req.params.id,
        user_id: req.user_id
    }, {
        $set: {
            active: false,
            updatedOn: new Date()
        }
    }, function (err, contacts) {
        if (err) {
            res.send({
                error: err,
                status: false
            })
        } else {
            res.send({
                contacts: contacts,
                status: true
            })
        }
    })
});
module.exports = app;