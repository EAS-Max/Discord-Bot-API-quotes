const { getAll } = require('../../controllers/quotes.js')

const get = async (req, res) => {
    try {
        let rows = await getAll()
        res.json(rows)
    } catch (err) {
        res.json({ error: err.message })
    }

}

const post = async (req, res) => {
    res.json({})
}

module.exports = {
    get,
    post
}