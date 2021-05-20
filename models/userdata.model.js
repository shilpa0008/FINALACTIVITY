const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserDataSchema = new Schema({
  firstName:{type: String},
  lastname:{type: String},
  address:{type: String},
  phoneNumber:{type: Number},
  email:{type: String, unique: true},
  password:{type: String}

  //avatar : {type: String}
});
// Export the model
module.exports = mongoose.model('UserData', UserDataSchema);