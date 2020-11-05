const express = require('express')
const Garden= require('../models/gardens.js')
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
         'plantssch/search.ejs'
         , {currentUser: req.session.currentUser}
      )
    })

module.exports = plantssch