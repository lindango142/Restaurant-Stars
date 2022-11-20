const Restaurant = require('../models/restaurantModel');

const restaurantController = {};

restaurantController.getAllRestaurants = (req, res, next) => {
  Restaurant.find({}, (err, restaurants) => {
    // invoke global error if error
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    // store the restaurants found into res.locals
    res.locals.restaurants = restaurants;
    return next();
  });
};

restaurantController.addRestaurant = (req, res, next) => {
  // console.log(req.body)
  Restaurant.create(req.body, (err, restaurants) => {
    if (err) return next(err);
    res.locals.status = 'done'
    console.log('posted restaurant')
    return next();
  })
}

restaurantController.updateRestaurant = (req, res, next) => {
  // console.log(req.body)
  Restaurant.findOneAndUpdate({ name: req.body.name }, { review: req.body.review, status: req.body.status }, (err, updated) => {
    if (err) return next(err);
    res.locals.status = 'done'
    console.log('updated restaurant')
    return next();
  })
}

restaurantController.deleteRestaurant = (req, res, next) => {
  Restaurant.findOneAndDelete({ name: req.body.name }, (err, updated) => {
    if (err) return next(err);
    res.locals.status = 'done'
    console.log('deleted restaurant')
    return next();
  })
}

module.exports = restaurantController;