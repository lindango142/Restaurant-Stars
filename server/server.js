const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userController = require('./controllers/userController');
const restaurantController = require('./controllers/restaurantController')

const PORT = 3000;

const app = express();

const MONGO_URI = '';
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that the collections are part of
  dbName: 'card'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded());
// app.use(cookieParser())


app.get('/restaurants', restaurantController.getAllRestaurants, (req, res) => {
  res.status(200).json(res.locals.restaurants)
})
app.post('/restaurants', restaurantController.addRestaurant, (req, res) => {
  res.status(200);
});

// root
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../reviews.html'));
});

app.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful sign up?
  res.status(200)
});
app.get('/users', userController.getAllUsers, (req, res) => {
  res.json(res.locals.users);
})

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;