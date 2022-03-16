const fs = require('fs');


const routing = (express) => {
    const router = express.Router();

    router.get('/', function (_req, res) {
        fs.readFile('src/pages/intro/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    router.get('/room', function (_req, res) {
        fs.readFile('src/pages/room/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    router.get('/intro', function (_req, res) {
        fs.readFile('src/pages/intro/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    router.get('/register', function (_req, res) {
        fs.readFile('src/pages/register/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });


    return router;
}

module.exports = routing;