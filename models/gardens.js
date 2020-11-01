const mongoose = require('mongoose')
const Schema = mongoose.Schema
const gardenSchema = Schema({
  gardenName: { type: String,
               required: true 
              },
  description: {type: String ,
               required: true
               },
  gardenType:  {
                type: String,
                required:true
                },
  image:        [{ 
                data:Buffer,
                contentType:String
                }],
   user : {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
    },
  
    { timestamps: true },
)

const Garden = mongoose.model('Garden', gardenSchema)
module.exports = Garden