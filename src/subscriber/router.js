const express = require('express');
const router = express.Router();
const subscriberService = require('./service');

// create organization
router.post( '/:topic',  subscriberService.subscribe );

module.exports = router;