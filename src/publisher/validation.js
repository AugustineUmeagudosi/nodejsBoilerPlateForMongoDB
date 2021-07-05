const Joi = require('@hapi/joi');

module.exports = {
  createTopic: (topic) => {
    const schema = Joi.object().keys({
      topic: Joi.string().required()
    });
  
    return schema.validate(topic);
  },
  
  publishMessage: (message) => {
    const schema = Joi.object().keys({
      data: Joi.object().required()
    });
  
    return schema.validate(message);
  }
};