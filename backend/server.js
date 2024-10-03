const https = require('https');
const path = require('path');
const express = require('express');

require('dotenv').config();

const app = express();

const { privateKey } = process.env.PRIVATE_KEY;
const { certificate } = process.env.CERTIFICATE;

const options = {
    key: privateKey,
    cert: certificate,
}

app.use(express.static(path.join(__dirname, 'dist')));

const port = 3000;

https.createServer(options, app).listen(port, () => {
    console.log('Server listening on port ' + port);
});
