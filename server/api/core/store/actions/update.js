'use strict';

let _ = require('lodash');
let BaseActions = require('./base.action');

class UpdateStore extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {

    let oldStore = super.resources.findOne({
      "_id": super.requestBody.id+''
    });

    oldStore.then((store) => {
      store.increment();
      store = _.merge(store, super.requestBody);
      return store.save();
    })
    .then((t) => {
      return super.response(200, {error: false, data: t});
    })
    .catch((e) => {
      return super.response(200, {error: true, message: e});
    });
  }
}

module.exports = (request, reply) => {
  let updator = new UpdateStore(request, reply);
  updator.processRequest();
}
