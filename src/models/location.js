// import node modules
const mongoose = require('mongoose');

// define a schema
const LocationModelSchema = new mongoose.Schema ({
  name        	: String,
  address    	: String,
  zip   	: Number,
  rating : Number,
  popDrinks : [String],
});

// compile model from schema
module.exports = mongoose.model('LocationModel', LocationModelSchema);
