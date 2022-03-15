const express = require('express');
const routing = require('./src/routes');

const app = express();

// use
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));
app.use('', routing(express))

// listening
app.listen(process.env.PORT, function () {
    console.log("Listening on Port 5000");
});
