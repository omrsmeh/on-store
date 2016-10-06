'use strict';

class Users {

  constructor(server) {
    let connection = server.connection;
    let mongoose   = server.lib;
    let Schema     = mongoose.Schema;

    let userSchema = new Schema({
      fname: { type: String },
      lname: { type: String },
      email: { type: String, unique: true },
      hashpass: { type: String },
      mobile: { type: String }
    });

    this.User = connection.model('User', userSchema);
  }

  save(newValue, cb) {
    let user = new this.User(newValue);
    user.save(cb);
  }
}

module.exports = Users;
module.exports.getName = () => {
  return 'users';
}
