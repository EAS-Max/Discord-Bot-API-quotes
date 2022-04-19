const fs = require('fs');
const QUOTES_FILE = './utils/quotes.json'

let quoteRepo = {
    get: function (resolve, reject) {
        fs.readFile(QUOTES_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },
};

module.exports = quoteRepo;