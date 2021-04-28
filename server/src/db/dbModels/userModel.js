const mongoose = require('mongoose')

const User = mongoose.model('User', {
    "userId" : {
        type : String,
        required : true,
        trim : true
    },
    "startTime" : {
        type : Date,
        required : true
    },
    "endTime" : {
        type : Date
    },
    "sessionPeriod" : {
        type : Number,
    }
})

module.exports = User