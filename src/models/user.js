// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  googleid     	: String,
  points        : Number,
  status        : String,
  favStore      : String,
  favDrink      : String,
  badges        : [String],
  storesVisited : [(String, String)],
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
