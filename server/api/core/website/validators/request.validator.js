'use strict';

let Joi = require('joi');

class RequestVaildator {

  getListParameterValidator() {
    return {
      type: Joi.any().valid(process.env.WEBSITE_VISIBILITY_TYPE.split(','))
    }
  }

  getListQueryValidator() {
    let _limit   = parseInt(process.env.PAGINATION_LIMIT);
    let _storeId = parseInt(process.env.ID_PARAM_SIZE_LIMIT);

    return {
      page: Joi.number().min(1),
      limit: Joi.number().min(_limit),
      store_id: Joi.string().min(_storeId)
    }
  }

  getPostValidator() {
    return {
      name: Joi.string().min(5).max(35).required(),
      baseCurrency: Joi.string().min(2).max(10).required(),
      storeId: Joi.string().min(24).max(24).required(),
      baseCateogryId: Joi.string().min(24).max(24).required(),
      activeWebsite: Joi.boolean()
    }
  }

  getUpdateValidator() {

    let updateValidator = this.getPostValidator();
    updateValidator.id  = Joi.string().alphanum().min(24);

    return updateValidator;
  }


  isValidStoreRequest(type, storeId) {
    let _return = true;

    if(/^store((_((in)?active))?)$/.test(type) && (!storeId || storeId == '' || storeId == null || typeof storeId == 'undefined')) {
      _return = false;
    }

    return _return;
  }

}

module.exports = new RequestVaildator();
