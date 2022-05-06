const { getByPersonLike } = require('../../controllers/quotes.js')

const get = async (req, res) => {
    try {
        const rows = await getByPersonLike(req.params.person)
        res.json(rows)
    } catch (err) {
        res.json({ error: err.message })
    }
}


module.exports = {
    get
}