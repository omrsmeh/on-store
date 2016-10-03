'use strict';

let Joi = require('joi');

class RequestVaildator {

  getListParameterValidator() {
    return {
      type: Joi.any().valid(process.env.STORE_LIST_PARTS.split(','))
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
      logoImage: Joi.string().min(20).max(255).required(),
      emailLogoImage: Joi.string().min(20).max(255).required(),
      activeStore: Joi.boolean()
    }
  }

  getUpdateValidator() {

    let updateValidator = this.getPostValidator();
    updateValidator.id  = Joi.string().alphanum().min(24);

    return updateValidator;
  }

}

module.exports = new RequestVaildator();
