'use strict';

let ApiBaseActions = require('./../../../apibase.actions');

class BaseStoreActions extends ApiBaseActions {

  constructor(request, reply) {
    super(request, reply);
    this.dbResorce = request.server.settings.app.webstore;
  }

  get resources() {
    return this.dbResorce
  }
}

module.exports = BaseStoreActions;
