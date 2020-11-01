const express = require('express')
const Garden= require('../models/gardens.js')
const gardens = express.Router()

const multer = require('multer'); 
const User = require('../models/users.js');

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { 
      cb(null, 'uploads') 
  }, 
  filename: (req, file, cb) => { 
      cb(null, file.fieldname + '-' + Date.now()) 
  } 
}); 

const upload = multer({ storage: storage }); 

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}
// NEW
gardens.get('/new', (req, res) => {
    console.log("hhhhh");
   // res.send("hello world");
     res.render(
       'garden/new.ejs'
       , {currentUser: req.session.currentUser}
    )
  })



// Retriving the image 
// Retriving the image 
gardens.get('/images', (req, res) => { 
    Garden.find({}, (err, items) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('app', { items: items }); 
        } 
    }); 
  }); 
  
  // Uploading the image 
  gardens.post('/garden', upload.single('image'), (req, res, next) => { 
    
    const gardenobj = { 
        gardenName: req.body.gardenName, 
        description: req.body.description, 
        gardenType:req.body.gardenType, 
        img: { 
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), 
            contentType: 'image/png'
        } 
    } 
    Garden.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            // item.save(); 
            res.redirect('/'); 
        } 
    }); 
  }); 

// INDEX
gardens.get('/', (req, res) => {

    //res.send('hello world');
  
    Garden.find({}, (error, allGarden) => {
         console.log(error);
          console.log('all garden',allGarden);
           res.render('garden/index.ejs', {
           gardens: allGarden
          ,currentUser: req.session.currentUser
        })
      })
  })

  module.exports = gardens