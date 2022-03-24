const { FRONTEND_ROUTES } = require('../config/route');
const fs = require('fs');


const routing = (express) => {
    const router = express.Router();

    // route default (introduce) page 
    router.get(FRONTEND_ROUTES.DEFAULT, function (_req, res) {
        fs.readFile('src/pages/intro/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    // route room page
    router.get(FRONTEND_ROUTES.ROOM, function (_req, res) {
        fs.readFile('src/pages/room/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    // route introduce page
    router.get(FRONTEND_ROUTES.INTRODUCE, function (_req, res) {
        fs.readFile('src/pages/intro/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    // ruote register page 
    router.get(FRONTEND_ROUTES.REGISTER, function (_req, res) {
        fs.readFile('src/pages/register/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    // route not found(404) for link left
    router.get(FRONTEND_ROUTES.ALL, function (_req, res) {
        fs.readFile('src/pages/404/index.html', function (err, data) {
            if (err) return console.log(err);
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    });

    return router;
}

module.exports = routing;