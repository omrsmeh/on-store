'use strict';

const Confidence = require('confidence');

const criteria = {
  env: process.env.NODE_ENV
};

const config = {
  $meta: 'On Store API',
  projectName: 'on-store-api',
  port: {
    api: {
      $filter: 'env',
      test: 9090,
      $default: process.env.SERVER_PORT
    }
  }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

  return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
