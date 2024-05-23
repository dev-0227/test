const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


const login = require('./routes/login');
const user = require('./routes/user');
const manager = require('./routes/manager');
const setting = require('./routes/setting');
const role = require('./routes/role');


const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control']
};
app.use(cors(corsOptions));
// Your other middleware and routes
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes


// Config middlewares
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


app.use('/login', login);
app.use('/user', user);
app.use('/manager', manager);
app.use('/setting', setting);
app.use('/role', role);

module.exports = app;
