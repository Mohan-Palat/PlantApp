const express = require('express')
const Garden= require('../models/gardens.js')
const gardens = express.Router()
const User = require('../models/users.js');
const fs = require('fs'); 
const path = require('path'); 
const multer = require('multer'); 

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

gardens.post('/', upload.single('image'), (req, res, next) => { 
    console.log("success");
    let fname='uploads/'+req.file.filename;
    console.log('filepath====',req.file.path);
    console.log('filepath====',req.file.mimetype);
    const obj = { 
        gardenName: req.body.gardenName,
        description: req.body.description,
        img: { 
            data: fs.readFileSync(path.join( '/Users/sunitha/sei/project-2/uploads/' + req.file.filename)), 
            contentType: req.file.mimetype
           
         } ,
    } 
   Garden.create(obj, (err, item) => { 
        if (err) { 
            console.log(err); 
        } 
        else { 
            res.render('garden/index.ejs', {
               currentUser: req.session.currentUser
               ,errormessage: 'Success-Record Created' 
               });    
            } 
       }); 

   }); 

// INDEX
gardens.get('/show', (req, res) => {
    Garden.find({}, (error, allGarden) => {
         console.log(error);
         console.log('all garden',allGarden);
           res.render('garden/show.ejs', {
           gardens: allGarden
          ,currentUser: req.session.currentUser
       
           });
         })
      })



// SHOW details
gardens.get('/:id', (req, res) => {
    console.log('garden by id');
    Garden.findById(req.params.id, (error, foundGarden) => {
        res.render('garden/showdetails.ejs', {
            garden: foundGarden
           ,currentUser: req.session.currentUser
         });
        //console.log(foundGarden);
     })
  })
//DELETE

// DELETE
gardens.delete('/:id', (req, res) => {
    Garden.findByIdAndRemove(req.params.id, (error) => {
        console.log('deleted')
        res.render('garden/index.ejs',{
            currentUser: req.session.currentUser,
            errormessage: 'deleted' 
         });
    //  res.redirect('/garden/show');
    });
  });
  
gardens.get('/', (req, res) => {
    res.render('garden/index.ejs',{
        currentUser: req.session.currentUser,
        errormessage: '' 
     });
    });



gardens.get('/:id/edit', (req, res) => {
        // app.get('/:userId/tweets/:tweetId/edit', (req, res) => {
       // set the value of the user and tweet ids
       const userId = req.params.userId;
       const gardenId = req.params.id;
       // find user in db by id
       Garden.findById(req.params.id, (error, foundGarden) => {
           res.render('garden/edit.ejs', {
               garden: foundGarden
              ,currentUser: req.session.currentUser
            });
     });
})

// UPDATE garden EMBEDDED IN A USER DOCUMENT
    gardens.put('/:id', (req, res) => {
       console.log('PUT ROUTE');
       // set the value of the user and tweet ids
       const userId = req.params.userId;
       const gardenId = req.params.id;
       // find user in db by id
       Garden.findById(userId, (err, foundGarden) => {
        // update garden and completed with data from request body
        const obj = { 
            gardenName: req.body.gardenName,
            description: req.body.description,
            img: { 
                data: fs.readFileSync(path.join( '/Users/sunitha/sei/project-2/uploads/' + req.file.filename)), 
                contentType: req.file.mimetype
               } ,
             } 

             Garden.save(obj, (err, item) => { 
                if (err) { 
                    console.log(err); 
                } 
                else { 
                    //console.log('what is item--->',item);
                    //console.log('success'); 
                    res.render('garden/index.ejs', {
                       currentUser: req.session.currentUser
                       ,errormessage: 'Success-Record Created' 
                       });    
                    } 
               }); 
       
           });
});



  
  
module.exports = gardens