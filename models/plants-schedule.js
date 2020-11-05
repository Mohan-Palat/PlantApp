const mongoose = require('mongoose')
const Schema = mongoose.Schema
const plantSchSchema = Schema({
  plantName: { type: String,
               required: true 
              },
  month:      {type: String ,
               required: true
               },
  //gardenType:  {
              //  type: String,
              //  required:true
               // },
  scientificName:  {type: String ,
                    
                  },
   zone :         {type: String },
  
                 },
  
    { timestamps: true },
)

const Garden = mongoose.model('Garden', gardenSchema)
module.exports = Garden