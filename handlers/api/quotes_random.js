const { getRandom } = require('../../controllers/quotes.js')

const get = async (req, res) => {
    try {
        const row = await getRandom(req.params.id)
        res.json(row)
    } catch (err) {
        res.json({ error: err.message })
    }
}

// const randomID = rndInt2(1, 50)

function rndInt2(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
module.exports = {
    get,
}