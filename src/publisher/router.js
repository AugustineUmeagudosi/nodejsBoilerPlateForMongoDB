const express = require('express');
const router = express.Router();
const publisherService = require('./service');

// create topic
router.post( '/createTopic',  publisherService.createTopic );
// publish message
router.post( '/:topic',  publisherService.publishMessage );

module.exports = router;