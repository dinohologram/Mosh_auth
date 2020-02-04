const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ "email": req.body.email });
    //Notice subtle use of `let`. Because it will change if doesn't exist already? 
    if (user) return res.status(400).send('User already exists') //exits if user exists
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    //Encrypt password
    //Note asynchronicity
    const salt = await bcrypt.genSalt(10) //A salt is used to obfuscate stored data from hackers
    user.password = await bcrypt.hash(user.password, salt) //Is hashing a form of encryption? A digital fingerprint.

    await user.save();

    //Issue JSON Web Token
    //generateToken() is defined in User.methods *Information Expert Principle
    const token = user.generateToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name','email']));
    // Or, res.header('x-auth-token', user.generateToken())

});

module.exports = router; // the key to threading this through /index.js