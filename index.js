const express = require('express');
const routing = require('./src/routes');
// const configuration = require('./src/config/dotenv_config');

const app = express();

// use
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));

app.get('/', routing(express));

// listening
app.listen(3000, 'localhost', function() {
    console.log(`Server run at http://localhost:3000`);
});
