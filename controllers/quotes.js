const { query } = require("../utils/db.js")

const getAll = async () => {
    let rows = await query('SELECT * FROM quotes')
    return rows
}


const getByID = async (id) => {
    let [rows] = await query('SELECT * FROM quotes WHERE id=?', id)
    return rows
}



const getByPersonLike = async (person) => { }

module.exports = {
    getAll,
    getByID,
    getByPersonLike
}