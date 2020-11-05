const express = require('express')
const Garden= require('../models/gardens.js')
const gardens = express.Router()
const User = require('../models/users.js');
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 

//gets your app's root path
const root = path.dirname(require.main.filename)
console.log(root)



module.exports = gardens