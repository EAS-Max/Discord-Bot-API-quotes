const fs = require('fs');
const mysql = require("mysql");
const Promise = require('promise');
const si = require('systeminformation');
var os = require('os');
const process = require('process');
const disk = require('diskusage');

const { getByID } = require('../../controllers/quotes.js')

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


module.exports = async (req, res) => {
        let params = req.params.command.split(",");

        switch (params[1]) {
            case "ID":
                try {
                    let row = await getByID(params[2])
                    res.json({ "status": "success", "status message": "sending quote", "discord_message": row.quote + " - " + row.person });
                } catch (error) {
                    res.json({ "status": "failed", "status_message": "can't res.json query", "discord_message": "failed to find quote with the ID of " + params[2] });
                }
                break;
            case "random":
                const randomID = rndInt2(1, 30)
                connection.query(`SELECT * FROM quotes WHERE id= ${randomID}`, function (err, result, fields) {
                    if (err) {
                        res.json(err)
                    } else {
                        res.json({ "status": "success", "status message": "sending quote", "discord_message": result[0].quote + " - " + result[0].person });
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
                        res.json(err)
                    }
                    res.json({ "status": "success", "status_message": "quote added", "discord_message": "Succesfully inserted quote" });
                });
                break;
            case "owner":
                    res.json({ "status": "success", "status_message": "Get owner", "discord_message": "https://tenor.com/view/dark-souls-ya-sobaka-ti-sobaka-yasosy-biby-gif-19664947" });
                break;
            case "person":
                const query2 = `SELECT * FROM quotes WHERE person LIKE ?`;
                params.shift()
                params.shift()
                var person = params.join(" ")
                connection.query(query2, `%${person}%`, function (err, result, fields) {
                    if (err) {
                        res.json(err)
                    }
                    let randomNum = getRandomInt(0, result.length - 1)
                    try {
                    res.json({ "status": "success", "status message": "sending quote", "discord_message": result[randomNum].quote + " - " + result[randomNum].person });
                    } catch {
                        res.json({ "status": "failed", "status_message": "can't res.json query", "discord_message": "failed to find quote from " + person });
                    }
                });
                break;
            case "delete":
                if (req.get("user") != "max56775684563") {
                    res.json({ "status": "success", "status_message": "Not Authorised", "discord_message": "Only gods an delete a quote" });
                    break;
                }
                const query4 = `DELETE FROM quotes WHERE quote=? AND person=?`
                params.shift()
                params.shift()
                var quote4 = params.join(" ").split("|")
                connection.query(query4, [quote4[0], quote4[1]], function (err, result, fields) {
                    if (err) {
                        console.log(err)
                        res.json(err)
                    }
                    res.json({ "status": "success", "status_message": "quote deleted", "discord_message": "Succesfully deleted quote" });
                });
                break;
                case "actions":
                    res.json({ "status": "success", "status_message": "Get all actions", "discord_message": `-----------------------------------------
\n**USAGE:**\ 

\n**!quote**\ <action>

\n**ACTIONS:**\

\n**add**\ <quote | name>

\n**random**\

\n**person**\ <name>

\n**ID**\ <id>

\n**delete**\ <quote | name>

\n**owner**\ ` });
                break;
            case "stats":
                    var usage = process.cpuUsage();
                    usage = process.cpuUsage(usage);
                    const memoryData = process.memoryUsage();  
                    var ut_sec = os.uptime();
                    var ut_min = ut_sec/60;
                    var ut_hour = ut_min/60;
       
                    ut_sec = Math.floor(ut_sec);
                    ut_min = Math.floor(ut_min);
                    ut_hour = Math.floor(ut_hour);
                    ut_hour = ut_hour%60;
                    ut_min = ut_min%60;
                    ut_sec = ut_sec%60;
                    let diskFree;
                    let diskTotal;
                    
                    disk.check('/', function(err, info) {
                        diskFree = info.free;
                        diskTotal = info.total;
                    });


                    res.json({"status": "success", "status_message": "sending back image", "discord_message": `**Stats:**
                    \n**Rss:**\ ${formatBytes(memoryData.rss)} Total memory allocated for the process execution
                    
                    \n**HeapTotal:**\ ${formatBytes(memoryData.heapTotal)}  Total size of the allocated heap

                    \n**HeapUsed:**\ ${formatBytes(memoryData.heapUsed)} Actual memory used during the execution
                    
                    \n**Total memory:**\ ${formatBytes(os.totalmem())}

                    \n**Free memory:**\ ${formatBytes(os.freemem())}
                
                    \n**CPU:**\ ${usage.user} Mhz cpu used during the execution

                    \n**CPUS:**\ ${os.cpus().length}
                    
                    \n**Disk free**\ ${formatBytes(diskFree)}

                    \n**Disk total**\ ${formatBytes(diskTotal)}

                    \n**Disk used**\ ${formatBytes(diskTotal - diskFree)}
                    
                    \n**Up time:**\ ${ut_hour} Hour(s) ${ut_min} minute(s) and ${ut_sec} second(s)
                    `
                });
            }

    };
    
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
    function rndInt2(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    // const previousUsage = process.cpuUsage();
    // const startDate = Date.now();
    // while (Date.now() - startDate < 500);

    // const usage = process.cpuUsage(previousUsage);
    // const memory = process.memoryUsage(previousUsage);

    // const usageResult = 100 * (usage.user + usage.system) / ((Date.now() - startDate) * 1000)

    // console.log(usageResult);

    // var heapFree = 0
    // setTimeout(function () {
    //     console.log(usage.heapTotal);
    //     console.log(memory.heapTotal);
    //     console.log(memory.heapUsed);

    // }, 2000);
    // heapFree += parseInt(memory.heapTotal) - parseInt(memory.heapUsed)
    // res.json({ "status": "success", "status_message": "Question", "discord_message": "CPU " + usageResult + "\n Memory used" + process.memoryUsage(previousUsage).heapUsed + "\n Memory free" + heapFree });
    // const query1 = `INSERT INTO quotes 
    // (quote, person) 
            // VALUES
            // (?, ?)`;
        
            // connection.query(query1, [params[2], params[3]], function (err, result, fields) {
            //     if (err) {
            //         res.json(err)
            //     }
            //     res.json({ "status": "success", "status_message": "sending quote", "discord_message": "added quote" });
            // });
            // let quoteRepo = {
                //     get: function (res.json, res.json) {
//         return new Promise((res.json, res.json) => {
//             connection.query("SELECT * FROM `quotes`", function (err, result, fields) {
//                 if (err) {
//                     res.json(err);
//                 }
//                 else {
//                     res.json(result);
//                 }
//             });
//         })
//     },
//     ID: function (id, res.json, res.json) {
//         connection.query(`SELECT * FROM quotes WHERE id="${id}"`, function (err, result, fields) {
//             if (err) {
//                 res.json(err)
//             } else {
//                 res.json(result);
//             }

//         });
//     },
//     getRandom: function (res.json, res.json) {

//         const randomID = rndInt2(1, 24)

//         connection.query(`SELECT * FROM quotes WHERE id= ${randomID}`, function (err, result, fields) {
//             if (err) {
//                 res.json(err)
//             } else {
//                 res.json(result);
//             }
//         });
//     },


// };




// module.exports = quoteRepo;


    //     ID: function (id, res.json, res.json) {
    //         fs.readFile(QUOTES_FILE, function (err, data) {
    //             if (err) {
    //                 res.json(err);
    //             }
    //             else {
    //                 let pie = JSON.parse(data).find(p => p.id == id);
    //                 res.json(pie);
    //             }
    //         });
    //     }
    // };


/*

    // Validate :command parameter has data
    if (req.params.command.length < 1) {
        res.json({ status: "error", status_message: "invalid command structure" })
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
        res.json({ status: "error", status_message: "insufficient_parameters" })
    }


    // Validate identifier matches this bot api
    if (req_identifier != spec.identifier) {
        res.json({ status: "error", status_message: "identifier_does_not_match" })
    }

    // Validate action is valid for this bot api
    if (!spec.actions.includes(req_action)) {
        res.json({ status: "error", status_message: "invalid_action", discord_message: req_action + " isn't a valid action. \n Valid actions are: \n " + spec.actions.join("\n") })
    }

    // Validate action has required parameters
    for (i = 0; i < spec.schema[req_action].args.length; i++) {
        let arg_spec
        arg_spec = "Name: " + spec.schema[req_action].args[i].name + " \n Required format: \n !" + req_identifier + " " + req_action + " <parameter> \n Requirements for parameter: \n"
        for (const [key, value] of Object.entries(spec.schema[req_action].args[i])) {
            arg_spec += key + " : " + value + "\n";
        }
        if (!params[i + 2]) {

            res.json({ status: "error", status_message: "missing_required_parameter", discord_message: "Missing required parameter. \n" + arg_spec })
        } else {
            if (params[i + 2].length < spec.schema[req_action].args[i].min || params[i + 2].length > spec.schema[req_action].args[i].max || !validator.isAlphanumeric(params[i + 2].trim())) {
                res.json({ status: "error", status_message: "invalid_format_required_parameter", discord_message: "Parameter not in required format. \n" + arg_spec })
            }
        }
    }

    res.json({ status: "success", status_message: "valid_command" })
*/