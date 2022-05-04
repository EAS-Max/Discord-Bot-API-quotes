var quotes = require('../UI-Route/quoteRoute.js');

module.exports = function (app) {
    app.get('/api/quote', (req, res, next) => {

        var getResponse = quotes.func(req);
        getResponse.then((response) => {
            res.send(response)
        }).catch(err => {
            res.send(err);
        });
    });
}