'use strict';

const AuthValidator = function (decoded, request, callback) {
  return callback(null, (decoded.id && decoded.email));
};

module.exports = AuthValidator;
