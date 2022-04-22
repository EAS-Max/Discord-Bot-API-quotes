/**
 * @openapi
 * /api/validate/{command}:
 *  get:
 *    description: Validate the bot command being used with this API
 *    produces:
 *     - application/json
 *    parameters:
 *     - name: command
 *       in: path
 *       required: true
 *       type: string    
 *    responses:
 *       200:
 *         description: Returns JSON document with validation results
 */

var QuoteRepo = require('../repo/quoteRepo.js')
module.exports = function (app) {
    app.get('/api/command/:command', (req, res, next) => {

        var getResponse = QuoteRepo.func(req)
        getResponse.then((response) => {
            res.send(response)
        }).catch(err => {
            res.send(err)
        })

    })
}
