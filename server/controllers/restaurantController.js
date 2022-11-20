const Restaurant = require('../models/restaurantModel');

const restaurantController = {};

restaurantController.getAllRestaurants = (req, res, next) => {
  Restaurant.find({}, (err, restaurants) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.restaurants = restaurants;
    return next();
  });
};

restaurantController.addRestaurant = (req, res, next) => {
  // console.log(JSON.stringify(req.body))
  Restaurant.create(req.body, (err, restaurants) => {
    if (err) return next(err);
    res.locals.status = 'finished'
    return next();
  })
}

restaurantController.updateRestaurant = (req, res, next) => {
  console.log(req.body)
  for (let i = 0; i < req.body.length; i++) {
    Restaurant.findOneAndUpdate({ name: req.body[i].name }, { review: req.body[i].review, status: req.body[i].status }, (err, updated) => {
      if (err) return next(err);
    })
  }
  res.locals.status = 'finished'
  return next();
}

restaurantController.deleteRestaurant = (req, res, next) => {
  console.log(req.body, 'delete')
  Restaurant.findOneAndDelete({ name: req.body.name }, (err, updated) => {
    if (err) return next(err);
    res.locals.status = 'finished'
    return next();
  })
}

module.exports = restaurantController;