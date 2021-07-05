const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hr
    max: 500, // limit each IP to 500 requests per windowMs
    message: "Too many requests made from this IP, please try again after an hour"
});


module.exports= function (app) {
    app.use(cors());
    app.use(limiter);
    app.use(helmet());
    app.use(compression());
};