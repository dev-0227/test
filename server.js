const port = process.env.PORT || 5001;

const https = require('http');
const app = require('./app');

const server = https.createServer(app);

server.listen(port, () => {
    console.log('Started server :' + port);
});
