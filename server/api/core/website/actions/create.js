'use strict';

let BaseActions = require('./base.action');

class CreateWebsite extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {
    let webStore = super.webStoreResource;
    let postData = super.requestBody;
        postData.activeWebsite = true;  // Set Default Value As True

    // Verify store exists or not
    webStore.findActiveStoresById(postData.storeId).then((store) => {
      if(!store) {
        return super.response(200, {
          error: false, message: 'Store not found, Invalid Store Information'
        });
      }

      // Saving website infromation
      let newWebsite = super.resources.save(super.requestBody);
      newWebsite.then((website) => {
        return super.response(201, {error: false, data: website});
      }).catch((e) => {
        return super.response(200, {error: true, message: e});
      });

    }).catch((_e) => {

      return super.response(200, {
        error: true, message: 'Store not found: ' + _e.message
      });
      
    });
  }
}

module.exports = (request, reply) => {
  let creator = new CreateWebsite(request, reply);
  creator.processRequest();
}
