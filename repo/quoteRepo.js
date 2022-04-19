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
    getById: function (id, resolve, reject) {
        fs.readFile(QUOTES_FILE, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let pie = JSON.parse(data).find(p => p.id == id);
                resolve(pie);
            }
        });
    }
};

module.exports = quoteRepo;