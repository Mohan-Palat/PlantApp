const mongoose = require('mongoose');
const Garden = require('./models/gardens');
const User = require('./models/users');
const mongoURI = 'mongodb://localhost/garden_auth';
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);
(async function () {
  // CREATE TWO ACTORS
//   const ashley = await User.create({
//     username: 'ashely',
//     password: 'tester1'
//   });
//   const alicia = await User.create({
//     username: 'alicia',
//     password: 'tester2'
//   });
//   const adam = await User.create({
//     username: 'adam',
//     password: 'tester3'
//   });
 
  const herbGarden = new Garden({
    gardenName: 'herb Garden',
    description: 'collecton of herbs',
    gardenType: 'herb',
    image: [],
  });
  const flowerGarden = new Garden({
    gardenName: 'flower Garden',
    description: 'collecton of flowers',
    gardenType: 'flower',
    image: [],
  });
 
  flowerGarden.save(function (err, garden) {
    if (err) {
      console.log(err);
    } else {
      console.log('first film is ', garden);
    }
  });
  herbGarden.save(function (err, garden) {
    if (err) {
      console.log(err);
    } else {
      console.log('second film is ', garden);
    }
  });
})();