'use strict';

let ApiBaseActions = require('./../../../apibase.actions');

class BaseWebsiteActions extends ApiBaseActions {

  constructor(request, reply) {
    super(request, reply);
    this.dbResorce      = request.server.settings.app.website;
    this.dbStoreResorce = request.server.settings.app.webstore;
  }

  get resources() {
    return this.dbResorce
  }

  get webStoreResource() {
    return this.dbStoreResorce;
  }
}

module.exports = BaseWebsiteActions;
