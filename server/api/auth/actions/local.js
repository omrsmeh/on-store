'use strict';

let ApiBaseActions = require('./../../apibase.actions');
let jwt = require('jsonwebtoken');

class AuthLocal extends ApiBaseActions {

  constructor(request, reply) {
    super(request, reply);
    this.req = request;
  }

  processRequest() {
    if(super.isAuthenticated) {
      let _auth    = super.authObject;
      let _profile = _auth.credentials.profile;
      let _token   = _auth.credentials.token;
      let _cert    = new Buffer(process.env.AUTH_CLIENT_SECRET, 'base64')
      let _jwtSign = jwt.sign({
        "id": _token,
        "email": _profile.email,
        "displayName": _profile.displayName
      }, _cert, {
        algorithm: process.env.TOKEN_ALGORITHS,
        audience: process.env.AUTH_CLIENT_AUDIENCE
      });

      super.responseCookie(process.env.AUTH_COOKIE_NAME, _jwtSign);
      return super.response(200, {"token": _jwtSign});
    }
    else {
      return super.response(200, {
        params: super.requestQuery,
        payload: super.requestParams,
        body: super.requestBody,
        token: _jwtSign
      });
    }
  }
}

module.exports = (request, reply) => {
  let creator = new AuthLocal(request, reply);
  creator.processRequest();
}
