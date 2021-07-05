const Joi = require('@hapi/joi');

module.exports = {
  createSubscription: (subscription) => {
    const schema = Joi.object().keys({
      url: Joi.string().required(),
    });
  
    return schema.validate(subscription);
  }
};