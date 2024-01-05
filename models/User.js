const { Schema, model } = require('mongoose')

// nuestros squema
const UserSchema = Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true}
})


module.exports = model('User', UserSchema)