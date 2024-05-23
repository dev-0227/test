const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const route = require('./route');

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
app.use('/api', route);

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Authorization, X-Custom-Header, Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
//     res.header("Access-Control-Expose-Headers", "Authorization, Content-Type, Allow, X-Response-Time, Cache-Control");
//     if (req.method === 'OPTIONS') {
//         res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
//         return res.status(200).json({});
//     }
//     next();
// });
// app.use('/api/diagnosisgroup', diagnosisgroup);

module.exports = app;
