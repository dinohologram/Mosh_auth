const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken') //JSON Web Token package.
require('dotenv/config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        min: 5,
        max: 100
    },
    password: {
        type: String,
        min: 8,
        max: 1024
    },
    isAdmin: {
        type: Boolean
    }
    //Syntax can be `isAdmin: Boolean`.
});

userSchema.methods.generateToken = function () {
    //sign() makes a JSON Web Token. First param is payload, second param is secret key.
    let token = jwt.sign({_id: this.id, isAdmin: this.isAdmin}, process.env.SECRET_KEY)
    return token
} // User class now has "self-knowledge" & accords to Information Expert Principle.

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    let schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(), //Note email() at end that enforces email rules
        password: Joi.string().required().min(8).max(100)
    }
    return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser