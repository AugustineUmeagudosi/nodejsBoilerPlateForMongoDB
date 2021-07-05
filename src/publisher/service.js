const _ = require('lodash'),
    dbQueries = require('./dbQueries'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/subroutines'),
{ v4: uuidv4 } = require('uuid');

module.exports = {
    createTopic: async (req, res) => {
        const { error } = validate.createTopic(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );

        const slug = req.body.topic.replace(/\s\s+/g, ' ').toLowerCase();  // remove double spaces from topic and convert to lowercased letters
        const topicExists = await dbQueries.findTopic(slug);
        if(topicExists) return responseMessages.badRequest('Topic already exists', res);

        const topic = _.pick(req.body, variables.topicDetails);
        topic.slug = slug;
        topic.id = uuidv4();
        const response = await dbQueries.createTopic(topic);

        const data = _.pick(response, variables.topicDetails);
        return res.status(201).send(data);
    },

    publishMessage: async (req, res) => { 
        const { error } = validate.publishMessage(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );
        let slug = helpers.stringSanitizer(req.params.topic);

        slug = slug.replace(/\s\s+/g, ' ').toLowerCase(); // remove double spaces from topic and convert to lowercased letters
        const topic = await dbQueries.findTopic(slug);
        if(!topic) return responseMessages.badRequest('Invalid topic', res);

        const message = _.pick(req.body, variables.messageDetails);
        message.id = uuidv4();
        message.topicId = topic.id;
        message.data = JSON.stringify(req.body.data);
        await dbQueries.createMessage(message);

        const data = {};
        data.topic = topic.topic;
        data.data = req.body.data;

        // broadcast the message to all subscribers
        let subscribers = await dbQueries.fetchSubscribers(topic.id);
        if(subscribers.length == 0) return responseMessages.created('Message published but no subscribers found', data, res);
        
        subscribers.forEach(async(subscriber) => {
            await helpers.sendBroadcastMessage(subscriber.subscriber.url, data);
        });

        return res.status(201).send(data);
    }
};