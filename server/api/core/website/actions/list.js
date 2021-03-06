'use strict';

let BaseActions = require('./base.action');
let Validator   = require('./../validators/request.validator');

class ListWebsites extends BaseActions {

  constructor(request, reply) {
    super(request, reply);
  }

  paginateContent(content, limit, page) {
    limit   = parseInt(limit ? limit : process.env.PAGINATION_LIMIT);
    page    = parseInt(page ? page : 1);
    content = content.limit(limit);
    content = content.skip((limit * (page - 1)))
    return content;
  }

  processRequest() {
    let resource  = super.resources;
    let parameter = super.requestParams;
    let query     = super.requestQuery;
    let content   = null;
    let reqType   = process.env.WEBSITE_VISIBILITY_TYPE.split(',');
    let findQuery = {}

    if(!Validator.isValidStoreRequest(parameter.type, query.store_id)) {
      return super.response(200, {error: true, message: 'Store Id is required'});
    }

    switch (parameter.type) {
      case reqType[0]:
        findQuery['activeWebsite'] = true;
        break;
      case reqType[1]:
        findQuery['activeWebsite'] = false;
        break;
      case reqType[2]:
        findQuery['storeId'] = query.store_id;
        break;
      case reqType[3]:
        findQuery['storeId']       = query.store_id;
        findQuery['activeWebsite'] = true;
        break;
      case reqType[4]:
        findQuery['storeId']       = query.store_id;
        findQuery['activeWebsite'] = false;
        break;
    };

    content = resource.find(findQuery);
    this.paginateContent(content, query.limit, query.page).then((t) => {
      return super.response(200, {error: false, data: t});
    })
    .catch((e) => {
      return super.response(200, {error: true, message: e});
    })
  }
}

module.exports = (request, reply) => {
  let handler = new ListWebsites(request, reply);
  return handler.processRequest();
};
