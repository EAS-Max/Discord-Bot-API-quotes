const { query } = require("../utils/db.js")

const getAll = async () => {
    let rows = await query('SELECT * FROM quotes')
    return rows;
}


const getByID = async (id) => {
    let [row] = await query('SELECT * FROM quotes WHERE id=?', id)
    return row;
}


const getByPersonLike = async (person) => {
    let rows = await query('SELECT * FROM quotes WHERE person LIKE ?', `%${person}%`)
    return rows;
}

module.exports = {
    getAll,
    getByID,
    getByPersonLike
}
