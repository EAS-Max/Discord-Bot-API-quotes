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


const getRandom = async (id) => {
    const randomID = rndInt2(1, 50)
    let [row] = await query(`SELECT * FROM quotes WHERE id=${randomID}`)
    return row;
}

function rndInt2(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const addQuote = async (quote, person) => {
    console.log('test')
    let row = await query(`INSERT INTO quotes
        (quote, person) 
         VALUES (?, ?)`, [quote, person])
    return row
}
module.exports = {
    getAll,
    getByID,
    getByPersonLike,
    getRandom,
    addQuote
}
