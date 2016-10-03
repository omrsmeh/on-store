'use strict';

let ApiLogger = require('./apilogger');

class ApiBaseActions {

  constructor(request, reply) {
    this.request   = request;
    this.response  = reply;
    this.apiLogger = new ApiLogger();
  }

  get requestBody() {
    return this.request.payload;
  }

  get requestParams() {
    return this.request.params;
  }

  get requestQuery() {
    return this.request.query;
  }

  get isAuthenticated() {
    let _r = this.request;
    return (_r.auth && (_r.auth.isAuthenticated === true));
  }

  get authObject() {
    return this.request.auth;
  }
  
  get logger() {
    return this.apiLogger;
  }

  responseCookie(cookieName, cookieValue) {
    
    this.response.state(cookieName, cookieValue);
  }
  
  response(statusCode, responseBody) {
    return this.response(responseBody).code(statusCode);
  }
}

module.exports = ApiBaseActions;
