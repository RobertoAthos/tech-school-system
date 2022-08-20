const mongoose = require('mongoose')
const { Schema } = mongoose

const attendenceSchema = new Schema({
    student: {
        type: String,
        ref: 'student'
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subject'
    },
    presence:{
        type: String
    },
    dob:{
        type:String
    }
})

module.exports = mongoose.model('attendence', attendenceSchema)
