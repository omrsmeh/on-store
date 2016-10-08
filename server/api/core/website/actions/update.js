'use strict';

let _ = require('lodash');
let BaseActions = require('./base.action');

class UpdateWebsite extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  processRequest() {

    let postData   = super.requestBody;
    let webStore   = super.webStoreResource;
    let oldWebsite = super.resources.findOne({
      "_id": postData.id+''
    });

    webStore.findActiveStoresById(postData.storeId).then((store) => {
      if(!store) {
        return super.response(200, {
          error: false, message: 'Store not found, Invalid Store Information'
        });
      }

      oldWebsite.then((website) => {
        website.increment();
        website = _.merge(website, postData);
        return website.save();
      })
      .then((t) => {
        return super.response(200, {error: false, data: t});
      })
      .catch((e) => {
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
  let updator = new UpdateWebsite(request, reply);
  updator.processRequest();
}
