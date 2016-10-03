'use strict';

const Composer = require('./index');
const validate = require('./server/api/auth/actions/validator');
const User     = require('./server/api/auth/model/users.model');
const Store    = require('./server/api/core/store/model/store.model');

Composer((err, server) => {

  if (err) {
    console.log('Error: Traced >>> ', err);
    throw err;
  }

  // PreResponse Handler to Catch BOOM Errors
  const preResponse = function (request, reply) {

    let response = request.response;

    if (response.isBoom) {
      if (response.output.statusCode === 401) {
        reply.state("auth-requester", request.url.href);
        return reply.redirect('/auth/');
      }
      // Replace error
      let error = response;
      let ctx = {
        statusCode: error.output.statusCode,
        error: error.output.payload.error,
        message: (error.isDeveloperError ? 'Oops! it\'s not you, it\'s us.' : error.output.payload.message)
      };
      if(parseInt(process.env.ALLOW_DEBUG) === 1) { console.log(error); }
      return reply(ctx).code(200);
    }

    return reply.continue();
  };

  server.ext('onPreResponse', preResponse);

  // Authentication Strategy
  server.auth.strategy('token', 'jwt', {
    key: new Buffer(process.env.AUTH_CLIENT_SECRET, 'base64'),
    validateFunc: validate,
    verifyOptions: {
      algorithms: process.env.TOKEN_ALGORITHS.split(','),
      audience: process.env.AUTH_CLIENT_AUDIENCE
    }
  });

  server.auth.strategy('bellauth', 'bell', {
    provider: 'auth0',
    location: 'http://localhost:9000/auth',
    config: {domain: 'omrsmeh.auth0.com'},
    password: process.env.AUTH_PASSWORD,
    clientId: process.env.AUTH_CLIENT_AUDIENCE,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    scope(request) {
      console.log(request.headers);
    },
    // Terrible idea but required if not using HTTPS especially if developing locally
    isSecure: false
  });

  server.auth.default('token');

  // Register all routes here because they pre-loads
  // and strategy are post-load which cause
  // error and API is load
  server.register({
    register: require('acquaint'),
    options: {
      relativeTo: __dirname,
      routes: [
        {
          includes: [
            './server/api/**/*Routes.js',
            './server/api/index.js'
          ]
        }
      ],
    }
  }, (err) => {

    // Settings to make authentication cookie
    // session based
    server.state(process.env.AUTH_COOKIE_NAME, {
      ttl: null,
      isSecure: true,
      isHttpOnly: true,
      encoding: 'base64json',
      clearInvalid: false, // remove invalid cookies
      strictHeader: true // don't allow violations of RFC 6265
    });

    // Setting App models
    server.settings.app = {
      'users': (new User(server.plugins['hapi-mongoose'])),
      'webstore': (new Store(server.plugins['hapi-mongoose']))
    };

    // KickStart Web Server
    server.start(() => {
      console.log('ON-Store API Server Running on port ' + server.info.port);
    });
  });

});
