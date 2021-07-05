const express = require('express');
const publisherRouter = require('../src/publisher/router');
const subscriberRouter = require('../src/subscriber/router');

module.exports = function (app) {
    app.use(express.json({ limit:"5mb" }));
    app.use(express.urlencoded({ limit:"5mb", extended: true }));

    app.use('/', express.Router().get("/", (req, res) => res.status(200).json({ 
        message: "hello" })
    ));

    app.use('/publish', publisherRouter);
    app.use('/subscribe', subscriberRouter);
};