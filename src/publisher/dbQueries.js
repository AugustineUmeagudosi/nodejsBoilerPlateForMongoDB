const { Sequelize, topic, message, subscriber, topic_subscriber } = require("../../models"),
variables = require('../helpers/parameters');

module.exports = {
    findTopic: (slug) => {
        return  topic.findOne({ where: {slug: slug} }).catch(error => console.log(error.message));
    },

    createTopic: (topicData) => {
        return  topic.create(topicData).catch(error => console.log(error.message));
    },

    createMessage: (messageData) => {
        return  message.create(messageData).catch(error => console.log(error.message));
    },

    fetchSubscribers: (topicId) => {
        return topic_subscriber.findAll({
            where: { topicId: topicId },
            include: { model: subscriber, as: 'subscriber', attributes: ['url'] }
        }).catch(error => console.log(error.message));
    }
};