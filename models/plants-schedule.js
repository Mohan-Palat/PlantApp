const mongoose = require('mongoose')
const Schema = mongoose.Schema
const plantSchSchema = Schema({
        plantName: {
            type: String,
            required: true
        },
        zip: {
            type: String,

        },
        month: {
            type: String,
            required: true
        },

        scientificName: {
            type: String,

        },
        zone: { type: String },
        action: { type: String },

    },

    { timestamps: true },
)

const Plant = mongoose.model('PlantSch', plantSchSchema)
module.exports = Plant