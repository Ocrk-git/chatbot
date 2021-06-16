const mongoose = require('mongoose')

const Journey = mongoose.model('Journey', {
    "journeyName" : {
        type : String,
        required : true,
        trim : true
    },
    "journeySlug" : {
        type : String,
        required : true,
        unique: true
    },
    "utterances" : {
        type : Array
    },
    "flow" : {
        type : Array,
    }
})

module.exports = Journey