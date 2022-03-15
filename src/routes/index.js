const fs = require('fs');


const routing = (express) => {
    const router = express.Router();

    router.get('/', function (_req, res) {
        fs.readFile('src/pages/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    router.get('/position', function (_req, res) {
        fs.readFile('src/pages/position/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    return router;
}

module.exports = routing;