const express = require('express');
const router = express.Router();
const barService = require('./service');

// create bar
router.post( '/',  barService.create );

module.exports = router;