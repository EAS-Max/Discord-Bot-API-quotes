const { addQuote } = require('../../controllers/quotes.js')

const post = async (req, res) => {
    try {
        const row = await addQuote(req.body.quote, req.body.person)
        res.json(row)
    } catch (err) {
        res.json({ error: err.message })
    }
}


module.exports = {
    post
}