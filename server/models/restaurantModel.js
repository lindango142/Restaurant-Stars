const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  address: {type: String, required: true},
  status: {type: String, required: true},
  review: {type: String}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);