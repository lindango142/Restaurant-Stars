const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

userController.createUser = (req, res, next) => {
  // write code here
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    else {
      return next();
    }
  })
};

module.exports = userController;