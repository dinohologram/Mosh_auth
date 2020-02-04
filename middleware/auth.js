const jwt = require('jsonwebtoken');
require('dotenv/config');

//Remember, these middleware functions need to be implemented within the routes as a parameter

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(400).send('No Token. Need to login.');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}