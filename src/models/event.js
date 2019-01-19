// import node modules
const mongoose = require('mongoose');

// define a schema
// changed the type of zip to be a string
// when it was a number, if 0 was the first digit, it was removed
// eg. 02139 -> 2139
const EventModelSchema = new mongoose.Schema ({
  name        	: String,
  address    	  : String,
  zip   	      : String,
  latLng        : JSON,
  timeStart       : Date,
  timeEnd     : Date,
});

// compile model from schema
module.exports = mongoose.model('EventModel', EventModelSchema);
