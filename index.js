const express  = require('express');
require('express-async-errors');
require('dotenv').config();

const port = process.env.PORT;
const app = express();
const errorHandler = require('./startup/errorHandler');

require('./startup/securityPackages')(app);
require('./startup/db_connection');
require('./startup/router')(app);
require('./startup/pageNotFound')(app);

app.use(errorHandler);
app.listen(port, () => console.log(`App listening on port ${port}...`));
