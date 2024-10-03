const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const options = {
    key: fs.readFileSync('./etherscore-test.com-key.pem'), // Replace with the path to your key
    cert: fs.readFileSync('./etherscore-test.com.pem') // Replace with the path to your certificate
}

app.use(express.static(path.join(__dirname, 'dist')));

const port = 3000;

https.createServer(options, app).listen(port, () => {
    console.log('Server listening on port ' + port);
});
