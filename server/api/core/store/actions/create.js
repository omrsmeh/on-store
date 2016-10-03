'use strict';

let BaseActions = require('./base.action');

class CreateStore extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {
    let postData = super.requestBody;
        postData.activeStore = true;  // Set Default Value As True
    let newStore = super.resources.save(super.requestBody);

    newStore.then((webstore) => {
      return super.response(201, {error: false, data: webstore});
    }).catch((e) => {
      return super.response(200, {error: true, message: e});
    })
  }
}

module.exports = (request, reply) => {
  let creator = new CreateStore(request, reply);
  creator.processRequest();
}
