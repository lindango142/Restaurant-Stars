const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // invoke global error if there's an error
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

userController.verifyUser = (req, res, next) => {
  User.findOne({username: req.body.username, password: req.body.password})
    .then(result => {
      // invoke global error if not found
      if (!result) return next('Error')
      return next()
  })
};

module.exports = userController;