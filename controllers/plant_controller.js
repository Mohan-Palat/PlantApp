const express = require('express')
const Plant = require('../models/plants-schedule.js')
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


//add plants

plantssch.get('/addPlants', (req, res) => {
    res.render(
        'plantssch/addPlants.ejs', { currentUser: req.session.currentUser }
    )
})

//show
plantssch.get('/show', async(req, res) => {
    await Plant.find({}, (error, allGarden) => {
        console.log(error);
        console.log('all garden', allGarden);
        res.render('plantssch/show.ejs', {
            plants: allGarden,
            currentUser: req.session.currentUser
        });
    })
})


plantssch.post('/', (req, res) => {
    console.log("GOING TO ADD");
    console.log(req.body)
    const obj = {
        plantName: req.body.plantName,
        zip: req.body.zipcode,
        month: req.body.Month,
        zone: req.body.hardnesszone,
        action: req.body.action
    }
    Plant.create(obj, (err, item) => {
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