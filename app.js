const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


const login = require('./routes/login');
const user = require('./routes/user');
const manager = require('./routes/manager');
const hedis = require('./routes/hedis');
const hedisloader = require('./routes/hedisloader');
const hedissetting = require('./routes/hedissetting');
// const invoice = require('./routes/invoice');


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
app.use('/hedisloader', hedisloader);
app.use('/hedis', hedis);
app.use('/hedissetting', hedissetting);
// app.use('/invoice', invoice);

module.exports = app;
