const _ = require('lodash'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
helpers = require('../helpers/subroutines');

module.exports = {
    publishFooMessage: async (req, res) => { 
        const { error } = validate.publishMessage(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );
        let slug = helpers.stringSanitizer(req.params.fooTopic);

        return res.status(201).send(data);
    }
};