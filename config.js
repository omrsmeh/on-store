'use strict';


require('dotenv').config();
const Confidence = require('confidence');


const criteria = {
  env: process.env.NODE_ENV
};


const config = {
  $meta: 'Fusion HTML API',
  projectName: 'fuse-cloud-api',
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
