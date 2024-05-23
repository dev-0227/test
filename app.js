const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


const login = require('./routes/login');
const user = require('./routes/user');
const manager = require('./routes/manager');
const setting = require('./routes/setting');
const role = require('./routes/role');
const referral = require('./routes/referral');
const insurance = require('./routes/insurance');
const specialist = require('./routes/specialist');
const permission = require('./routes/permission');
const audit_event = require('./routes/audit_event');
const clinic = require('./routes/clinic');
// const vital = require('./routes/vital');
const valueset = require('./routes/valueset');
// const database = require('./routes/database');
// const profile = require('./routes/profile');
const hedisloader = require('./routes/hedisloader');
// const hedis = require('./routes/hedis');
// const invoice = require('./routes/invoice');
const hedissetting = require('./routes/hedissetting');
const paymentsetting = require('./routes/paymentsetting');
const paid = require('./routes/paid');
const ffs = require('./routes/ffs');
const patientlist = require('./routes/patientlist');
const diagnosisgroup = require('./routes/diagnosisgroup');


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
app.use('/referral', referral);
app.use('/insurance', insurance);
app.use('/specialist', specialist);
app.use('/permission', permission);
app.use('/audit_event', audit_event);
app.use('/clinic', clinic);
// app.use('/vital', vital);
app.use('/valueset', valueset);
// app.use('/database', database);
// app.use('/profile', profile);
app.use('/hedisloader', hedisloader);
// app.use('/hedis', hedis);
// app.use('/invoice', invoice);
app.use('/hedissetting', hedissetting);
app.use('/paymentsetting', paymentsetting);
app.use('/paid', paid);
app.use('/ffs', ffs);
app.use('/patientlist', patientlist);
app.use('/diagnosisgroup', diagnosisgroup);


module.exports = app;
