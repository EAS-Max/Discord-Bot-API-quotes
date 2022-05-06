const express = require('express');
let router = express.Router();
const app = express();
app.use(express.json());
const fs = require('fs');
const path = require("path");
const cors = require('cors');

const { init: initDB } = require('./utils/db.js')

initDB()

app.use(cors())

app.use(express.static('public'));
app.use(express.text());

// bot routes
app.get('/api/validate/:command', require('./handlers/bot/validate.js'))
app.get('/api/command/:command', require('./handlers/bot/command.js'))

// ui routes


app.get('/api/quotes', require('./handlers/api/quotes.js').get)
app.post('/api/quotes', require('./handlers/api/quotes.js').post)
app.get('/api/quotes/:id', require('./handlers/api/quotes_id.js').get)
app.get('/api/quotes/person/:person', require('./handlers/api/quotes_person.js').get)



var server = app.listen(3000, function () {
    console.log('Server running on http://localhost:3000..');
});
