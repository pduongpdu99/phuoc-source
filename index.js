const express = require('express');
const routing = require('./src/routes');
const configuration = require('./src/config/dotenv');

const app = express();

// use
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));

app.get('/', routing(express));

// listening
app.listen(configuration.port, configuration.hostname, function() {
    console.log(`Server run at http://${configuration.hostname}:${configuration.port}`);
});
