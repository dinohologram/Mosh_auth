//middleware for authentication of administrator role
//403 - Forbidden if !isAdmin 
module.exports = function (req, res, next) { 

  if (!req.user.isAdmin) return res.status(403).send('Sorry. Not within your role.');

  next();
}