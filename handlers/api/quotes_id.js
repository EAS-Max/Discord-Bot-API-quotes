const { getByID } = require('../../controllers/quotes.js')

const get = async (req, res) => {
    try {
        const row = await getByID(req.params.id)
        res.json(row)
    } catch (err) {
        res.json({ error: err.message })
    }
}


module.exports = {
    get
}