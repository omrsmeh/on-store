'use strict';

let Joi = require('joi');

class RequestVaildator {

  getListParameterValidator() {
    return {
      type: Joi.any().valid(process.env.VISIBILITY_LIST_TYPES.split(','))
    }
  }

  getListQueryValidator() {
    return {
      page: Joi.number().min(1),
      limit: Joi.number().min(parseInt(process.env.PAGINATION_LIMIT))
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

}

module.exports = new RequestVaildator();
