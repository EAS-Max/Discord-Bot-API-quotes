const Promise = require('promise');
const spec = require('../spec.js');
const validator = require('validator');

exports.func = req => {
    return new Promise((resolve, reject) => {

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

    })
}