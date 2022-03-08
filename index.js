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
app.listen(process.env.PORT || 5000, function() {
    console.log(`Server run at http://localhost:5000`);
});
