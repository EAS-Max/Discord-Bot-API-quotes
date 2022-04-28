const fs = require('fs');
const mysql = require("mysql");
const { resolve } = require('path');
const { reject } = require('promise');
const Promise = require('promise');
const si = require('systeminformation');
var os = require('os');
const process = require('process')

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


exports.func = req => {
    return new Promise((resolve, reject) => {
        let params = req.params.command.split(",");

        switch (params[1]) {
            case "get":
                connection.query("SELECT * FROM `quotes`", function (err, result, fields) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ "status": "success", "status message": "sending quote", "discord_message": result[0].quote + " - " + result[0].person });
                    }
                });
                break;
            case "ID":
                const query = `SELECT * FROM quotes WHERE id=?`;
                connection.query(query, params[2], function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    try {
                    resolve({ "status": "success", "status message": "sending quote", "discord_message": result[0].quote + " - " + result[0].person });
                    } catch (error) {
                        reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "failed to find quote with the ID of " + params[2] });
                    }
                });
            case "random":
                const randomID = rndInt2(1, 30)
                connection.query(`SELECT * FROM quotes WHERE id= ${randomID}`, function (err, result, fields) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ "status": "success", "status message": "sending quote", "discord_message": result[0].quote + " - " + result[0].person });
                    }
                });
                break;
            case "add":
                const query3 = `INSERT INTO quotes
                (quote, person) 
                 VALUES (?, ?)`;
                params.shift()
                params.shift()
                var quote = params.join(" ").split("|")
                connection.query(query3, [quote[0], quote[1]], function (err, result, fields) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve({ "status": "success", "status_message": "quote added", "discord_message": "Succesfully inserted quote" });
                });
                break;
            case "owner":
                    resolve({ "status": "success", "status_message": "Get owner", "discord_message": "https://tenor.com/view/dark-souls-ya-sobaka-ti-sobaka-yasosy-biby-gif-19664947" });
                break;
            case "person":
                const query2 = `SELECT * FROM quotes WHERE person LIKE ?`;
                params.shift()
                params.shift()
                var person = params.join(" ")
                connection.query(query2, `%${person}%`, function (err, result, fields) {
                    if (err) {
                        reject(err)
                    }
                    let randomNum = getRandomInt(0, result.length - 1)
                    try {
                    resolve({ "status": "success", "status message": "sending quote", "discord_message": result[randomNum].quote + " - " + result[randomNum].person });
                    } catch {
                        reject({ "status": "failed", "status_message": "can't resolve query", "discord_message": "failed to find quote from " + person });
                    }
                });
                break;
            case "delete":
                if (req.get("user") != "max56775684563") {
                    resolve({ "status": "success", "status_message": "Not Authorised", "discord_message": "Only gods an delete a quote" });
                    break;
                }
                const query4 = `DELETE FROM quotes WHERE quote=? AND person=?`
                params.shift()
                params.shift()
                var quote4 = params.join(" ").split("|")
                connection.query(query4, [quote4[0], quote4[1]], function (err, result, fields) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve({ "status": "success", "status_message": "quote deleted", "discord_message": "Succesfully deleted quote" });
                });
                break;
                case "actions":
                    resolve({ "status": "success", "status_message": "Get all actions", "discord_message": `- 
USAGE: 

!quote <action>

ACTIONS:

add <quote | name>

random

person <name>

ID <id>

delete <quote | name>

owner` });
                break;
                case "stats": 
                    // si.cpu()
                    // .then(data => resolve({ "status": "success", "status_message": "Get all stats", "discord_message": JSON.stringify(data) }))
                    //resolve({ "status": "success", "status_message": "Get all stats", "discord_message": JSON.stringify(os.cpus()[1], JSON.stringify(os.totalmem()) )})
                    //resolve({ "status": "success", "status_message": "Get all stats", "discord_message": JSON.stringify(os.totalmem())})
                    resolve({ "status": "success", "status_message": "Get all stats", "discord_message": JSON.stringify(os.freemem())})
                    //resolve({ "status": "success", "status_message": "Get all stats", "discord_message": })
        }
    })
};
            
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            
            
            function rndInt2(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
        
            // const query1 = `INSERT INTO quotes 
            // (quote, person) 
            // VALUES
            // (?, ?)`;
        
            // connection.query(query1, [params[2], params[3]], function (err, result, fields) {
            //     if (err) {
            //         reject(err)
            //     }
            //     resolve({ "status": "success", "status_message": "sending quote", "discord_message": "added quote" });
            // });
            // let quoteRepo = {
                //     get: function (resolve, reject) {
//         return new Promise((resolve, reject) => {
//             connection.query("SELECT * FROM `quotes`", function (err, result, fields) {
//                 if (err) {
//                     reject(err);
//                 }
//                 else {
//                     resolve(result);
//                 }
//             });
//         })
//     },
//     ID: function (id, resolve, reject) {
//         connection.query(`SELECT * FROM quotes WHERE id="${id}"`, function (err, result, fields) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(result);
//             }

//         });
//     },
//     getRandom: function (resolve, reject) {

//         const randomID = rndInt2(1, 24)

//         connection.query(`SELECT * FROM quotes WHERE id= ${randomID}`, function (err, result, fields) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(result);
//             }
//         });
//     },


// };




// module.exports = quoteRepo;


    //     ID: function (id, resolve, reject) {
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


/*

    // Validate :command parameter has data
    if (req.params.command.length < 1) {
        reject({ status: "error", status_message: "invalid command structure" })
    }

    // Convert comma delimited command structure to an array
    let params = req.params.command.split(",");
    let req_identifier
    let req_action
    // Validate command array has minimum number of elements (2)
    try {
        req_identifier = params[0];
        req_action = params[1];
    } catch (err) {
        reject({ status: "error", status_message: "insufficient_parameters" })
    }


    // Validate identifier matches this bot api
    if (req_identifier != spec.identifier) {
        reject({ status: "error", status_message: "identifier_does_not_match" })
    }

    // Validate action is valid for this bot api
    if (!spec.actions.includes(req_action)) {
        reject({ status: "error", status_message: "invalid_action", discord_message: req_action + " isn't a valid action. \n Valid actions are: \n " + spec.actions.join("\n") })
    }

    // Validate action has required parameters
    for (i = 0; i < spec.schema[req_action].args.length; i++) {
        let arg_spec
        arg_spec = "Name: " + spec.schema[req_action].args[i].name + " \n Required format: \n !" + req_identifier + " " + req_action + " <parameter> \n Requirements for parameter: \n"
        for (const [key, value] of Object.entries(spec.schema[req_action].args[i])) {
            arg_spec += key + " : " + value + "\n";
        }
        if (!params[i + 2]) {

            reject({ status: "error", status_message: "missing_required_parameter", discord_message: "Missing required parameter. \n" + arg_spec })
        } else {
            if (params[i + 2].length < spec.schema[req_action].args[i].min || params[i + 2].length > spec.schema[req_action].args[i].max || !validator.isAlphanumeric(params[i + 2].trim())) {
                reject({ status: "error", status_message: "invalid_format_required_parameter", discord_message: "Parameter not in required format. \n" + arg_spec })
            }
        }
    }

    resolve({ status: "success", status_message: "valid_command" })
*/