const _ = require('lodash'),
    dbQueries = require('./dbQueries'),
    validate = require('./validation'),
    responseMessages = require('../helpers/responseMessages'),
    variables = require('../helpers/parameters'),
    helpers = require('../helpers/subroutines'),
{ v4: uuidv4 } = require('uuid');


module.exports = {
    subscribe: async (req, res) => {
        const { error } = validate.createSubscription(req.body);
        if(error) return responseMessages.badRequest( error.details[0].message, res );
        if(!helpers.isValidUrl(req.body.url)) return responseMessages.badRequest('Please enter a valid url.', res);

        const slug = helpers.stringSanitizer(req.params.topic);
        const topic = await dbQueries.findTopic(slug);
        if(!topic) return responseMessages.badRequest('The selected topic was not found.', res);
        
        const data = {};
        data.url = req.body.url;
        data.topic = topic.topic;

        let subscriber;
        const subscriberExists = await dbQueries.findSubscriber(req.body.url);

        if(subscriberExists){
            subscriber = subscriberExists;
        }else{
            // create subscriber
            subscriber = await createSubscriber(req.body);
        }

        const subscriptionExists = await dbQueries.findSubscription(topic.id, subscriber.id);
        if(subscriptionExists) return res.status(200).send({message: 'You have already subscribed to this topic', data: data});

        // create topic_subscription
        createNewSubscription(topic.id, subscriber.id);
        return res.status(201).send(data);
        // return responseMessages.created(`You have successfully subscribed to ${data.topic}.`, data, res);
    },
};

// create subscriber
async function createSubscriber(reqBody){
    const user = _.pick(reqBody, variables.subscriberDetails);
    user.id = uuidv4();
    subscriber = await dbQueries.createSubscriber(user);
    return subscriber;
}

// create topic_subscription
async function createNewSubscription(topicId, subscriberId){
    const subscription = {};
    subscription.id = uuidv4();
    subscription.topicId = topicId;
    subscription.subscriberId = subscriberId;
    await dbQueries.createSubscription(subscription);
}