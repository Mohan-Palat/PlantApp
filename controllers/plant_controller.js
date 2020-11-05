const express = require('express')
const Garden = require('../models/gardens.js')
const plantssch = express.Router()
const User = require('../models/users.js');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

//gets your app's root path
const root = path.dirname(require.main.filename)
console.log(root)

const isAuthenticated = (req, res, next) => {
        if (req.session.currentUser) {
            return next()
        } else {
            res.redirect('/sessions/new')
        }
    }
    // NEW
plantssch.get('/showplants', (req, res) => {
    res.render(
        'plantssch/search.ejs', { currentUser: req.session.currentUser }
    )
})


plantssch.post('/', (req, res, next) => {
    console.log("success");
    let fname = 'uploads/' + req.file.filename;
    console.log('filepath====', req.file.path);
    console.log('filepath====', req.file.mimetype);
    const obj = {
        gardenName: req.body.gardenName,
        description: req.body.description,
        img: {
            data: fs.readFileSync(path.join(root + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        },
    }
    Garden.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.render('garden/index.ejs', {
                currentUser: req.session.currentUser,
                errormessage: 'Success-Record Created'
            });
        }
    });
});




module.exports = plantssch