const { Sequelize, topic, subscriber, topic_subscriber } = require("../../models");
const variables = require('../helpers/parameters');

module.exports = {
    findTopic: (title) => {
        return  topic.findOne({ where: {topic: title} }).catch(error => console.log(error.message));
    },

    findSubscriber: (url) => {
        return  subscriber.findOne({ where: {url: url} }).catch(error => console.log(error.message));
    },

    createSubscriber: (subscriberData) => {
        return subscriber.create(subscriberData).catch(error => console.log(error.message));
    },

    findSubscription: (topicId, subscriberId) => {
        return  topic_subscriber.findOne({where: {topicId: topicId, subscriberId: subscriberId} }).catch(error => console.log(error.message));
    },

    createSubscription: (subscription) => {
        return topic_subscriber.create(subscription).catch(error => console.log(error.message));
    }
};