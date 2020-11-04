const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: false
 }));

 router.use(bodyParser.json());

router.post("/zip", async (req, res, next) => {
    console.log("'/test' call--");
    console.log( 'zip code.body==>', req.body.zip)
    const zip = req.body.zip;
    try {
      const response = await axios.get("https://phzmapi.org/"+zip+".json");
      console.log(response.data);
      console.log(JSON.stringify(response.data));
      res.render('hardness/zipresults.ejs',
      {'list' : response.data,
      currentUser: req.session.currentUser } )
      //res.json(response.data);
    }
    catch (err) {
      next(err)
    }
  })


  router.get('/search', (req, res) => {
    res.render(
       'hardness/search.ejs'
       , {currentUser: req.session.currentUser}
    )
  })




router.get("/getdata", (req, res, next) => {
    const zipcode = req.body.zipcode;
    //https://phzmapi.org/32258.json
    const getHardness= async () => {
        try {
           await axios.get('https://phzmapi.org/'+zipcode+'.json').then(function(response){
             console.log(response)
           })
        } catch (error) {
          console.error(error)
        }
      }
});





router.get('/', function(req, res, next) {
  request({
    uri: 'http://www.giantbomb.com/api/search',
   
  }).pipe(res);
});

module.exports = router;