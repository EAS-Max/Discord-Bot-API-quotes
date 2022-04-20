const fs = require('fs');
const mysql = require("mysql")

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Renegade187!',
    database: 'mysql'
});

connection.connect();

// function randomIntFromInterval(min, max) { // min and max included 
//     return Math.floor(Math.random() * (max - min + 1) + min)
// }
// const rndInt2 = randomIntFromInterval(1, 24)

let quoteRepo = {
    get: function (resolve, reject) {
        connection.query("SELECT * FROM `quotes`", function (err, result, fields) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    },
    getById: function (id, resolve, reject) {
        connection.query(`SELECT * FROM quotes WHERE id="${id}"`, function (err, result, fields) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }

        });
    },
    getRandom: function (resolve, reject) {

        const randomID = rndInt2(1, 24)

        connection.query(`SELECT * FROM quotes WHERE id= ${randomID}`, function (err, result, fields) {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    },


};

function rndInt2(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}



module.exports = quoteRepo;


    //     getById: function (id, resolve, reject) {
    //         fs.readFile(QUOTES_FILE, function (err, data) {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 let pie = JSON.parse(data).find(p => p.id == id);
    //                 resolve(pie);
    //             }
    //         });
    //     }
    // };