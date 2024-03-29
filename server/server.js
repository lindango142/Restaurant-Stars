const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config()

// const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController')

const PORT = 3000;

const app = express();

let MONGO_URI;

// connecting the db
if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.TEST_MONGO_URI
} else {
  MONGO_URI = process.env.MONGO_URI
}

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'card'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded());

// requests from the front end
app.get('/restaurants', restaurantController.getAllRestaurants, (req, res) => {
  res.status(200).json(res.locals.restaurants)
})
app.post('/restaurants', restaurantController.addRestaurant, (req, res) => {
  res.status(200).json(res.locals.status);
});
app.put('/restaurants', restaurantController.updateRestaurant, (req, res) => {
  res.status(200).json(res.locals.status);
})
app.delete('/restaurants', restaurantController.deleteRestaurant, (req, res) => {
  res.status(200).json(res.locals.status);
})

// root
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../reviews.html'));
});

app.post('/page', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../reviews.html'))
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.locals.message = errorObj.message; 
  // change to json
  return res.status(errorObj.status).json({error: res.locals.message});
});

let appServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = appServer;