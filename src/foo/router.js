const express = require('express');
const router = express.Router();
const fooService = require('./service');

// publish foo
router.post( '/:fooTopic',  fooService.publishFooMessage );

module.exports = router;