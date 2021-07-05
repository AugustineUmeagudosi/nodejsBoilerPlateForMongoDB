const express = require('express');
const fooRouter = require('../src/foo/router');
const barRouter = require('../src/bar/router');

module.exports = function (app) {
    app.use(express.json({ limit:"5mb" }));
    app.use(express.urlencoded({ limit:"5mb", extended: true }));

    app.use('/', express.Router().get("/", (req, res) => res.status(200).json({ 
        message: "Welcome" })
    ));

    app.use('/foo', fooRouter);
    app.use('/bar', barRouter);
};