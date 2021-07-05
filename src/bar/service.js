const _ = require('lodash'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
helpers = require('../helpers/subroutines');


module.exports = {
    create: async (req, res) => {
        const { error } = validate.createSubscription(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        return responseMessages.created(`You have successfully created bar.`, data, res);
    },
};