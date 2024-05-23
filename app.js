const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const login = require('./routes/login');

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

// app.get('/api', router);
app.use('/login', login);

module.exports = app;
