const express = require('express')
const Garden= require('../models/gardens.js')
const gardens = express.Router()


const User = require('../models/users.js');
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 

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
// gardens.get('/images', (req, res) => { 
//     Garden.find({}, (err, items) => { 
//         if (err) { 
//             console.log(err); 
//         } 
//         else { 
//             'garden/new.ejs'
//        , {currentUser: req.session.currentUser}
//         } 
//     }); 
//   }); 
  
  // Uploading the image 

  gardens.post('/', upload.single('image'), (req, res, next) => { 
    console.log("success");
    let fname='uploads/'+req.file.filename;
    console.log('filepath====',req.file.path);
    console.log('filepath====',req.file.mimetype);
    res.status(204).end();
    //const newImg = fs.readFileSync(path.join( '/Users/sunitha/sei/project-2/uploads/' + req.file.filename));
    //const encImg = newImg.toString('base64');
    const obj = { 
        gardenName: req.body.gardenName,
        description: req.body.description,
        //image:  Buffer.from(encImg, 'base64')

        //  gardenType:'herb',
         img: { 
            data: fs.readFileSync(path.join( '/Users/sunitha/sei/project-2/uploads/' + req.file.filename)), 
            contentType: req.file.mimetype
           
         } ,
        //image: Buffer.from(encImg, 'base64')
    } 
   Garden.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            console.log('success'); 
            // item.save(); 
          //  res.redirect('/'); 
        } 
    }); 
  

   
  }); 

// INDEX
gardens.get('/', (req, res) => {
    Garden.find({}, (error, allGarden) => {
         console.log(error);
         console.log('all garden',allGarden);
           res.render('garden/index.ejs', {
           gardens: allGarden
          ,currentUser: req.session.currentUser
        
          });
          
        })
      })


// SHOW
gardens.get('/:id', (req, res) => {
    console.log('garden by id');
    Garden.findById(req.params.id, (error, foundGarden) => {
        res.setHeader('content-type', foundGarden.img[0].contentType);
        res.send(foundGarden.img[0].data);
        console.log(foundGarden);
     
    })
  })


  module.exports = gardens