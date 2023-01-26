const Restaurant = require('../models/restaurantModel');

const restaurantController = {};

restaurantController.getAllRestaurants = (req, res, next) => {
  Restaurant.find({}, (err, restaurants) => {
    // invoke global error if error
    if (!restaurants || err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    // store the restaurants found into res.locals
    res.locals.restaurants = restaurants;
    return next();
  });
};

restaurantController.addRestaurant = (req, res, next) => {
  // console.log(req.body)
  Restaurant.create(req.body, (err, restaurants) => {
    if (!restaurants || err) return next({
      log: `Error caught in restaurantController.addRestaurant: ${err}`,
      status: 400,
      message: {err: 'An error occured while attempting to get logs'}
    });
    res.locals.status = 'done'
    console.log('posted restaurant')
    return next();
  })
}

restaurantController.updateRestaurant = (req, res, next) => {
  // console.log(req.body)
  Restaurant.findOneAndUpdate({ name: req.body.name }, { review: req.body.review, status: req.body.status }, (err, updated) => {
    if (!updated || err) return next({
      log: `Error caught in restaurantController.updateRestaurant: ${err}`,
      status: 400,
      message: {err: 'An error occured while attempting to get logs'}
    });
    res.locals.status = 'done'
    console.log('updated restaurant')
    return next();
  })
}

restaurantController.deleteRestaurant = (req, res, next) => {
  Restaurant.findOneAndDelete({ name: req.body.name }, (err, updated) => {
    if (!updated || err) return next({
      log: `Error caught in restaurantController.deleteRestaurant: ${err}`,
      status: 400,
      message: {err: 'An error occured while attempting to get logs'}
    });
    res.locals.status = 'done'
    console.log('deleted restaurant')
    return next();
  })
}

module.exports = restaurantController;