const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name: dbname } } = config;

mongoose.connect( `mongodb://${host}:${port}/${dbname}`, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false 
})
.then(() => console.log(`Connected to mongo ${process.env.NODE_ENV} server`))
.catch(err => console.error('Could not connect to MongoDB.', err));