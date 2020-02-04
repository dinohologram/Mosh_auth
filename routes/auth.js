const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const Joi = require('joi')

//Authorization
//
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return error.status(400).send(error.details[0].message);

    let user = await User.findOne({"email" : req.body.email});
    if (!user) res.status(400).send('No account exists');
    
    let validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return error.status(400).send('Something is invalid');
    // Why is it bad to let it be known which is invalid?

    let token = user.generateToken();
    //Once authorized, our server sends back a JSON Web Token (an AuthToken)
    res.send(token)
});

function validate(req) {
    let schema = {
        email: Joi.string().required().email().min(1).max(200),
        password: Joi.string().required().min(8).max(1024)
    }
    return Joi.validate(req, schema)
}

module.exports = router; // the key to threading this through /index.js