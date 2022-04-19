const express = require('express');
const quoteRepo = require("./repo/quoteRepo");
const res = require("express/lib/response");
let router = express.Router();
const app = express();
app.use(express.json());
const nodemon = require("nodemon");

router.get('/', function (req, res, next) {
    quoteRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "message": "All quotes retrieved.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
});

router.get('/:id', function (req, res, next) {
    quoteRepo.getById(req.params.id, function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "message": "Single quote retrieved.",
                "data": data
            });
        }
        else {
            res.status(404).json({
                "status": 404,
                "message": "The quote '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The quote '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err) {
        next(err);
    });
})

app.use('/api/', router);

var server = app.listen(3000, function () {
    console.log('Server running on http://localhost:3000..');
});