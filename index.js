const express = require('express');
let router = express.Router();
const app = express();
app.use(express.json());
const fs = require('fs');
const path = require("path");
const cors = require('cors');

app.use(cors())

app.use(express.static('public'));
app.use(express.text());





// Add all routes
fs.readdirSync(path.join(__dirname, "validate")).forEach(function (file) {
    if (file[0] === ".") {
        return;
    }
    require(path.join(__dirname, "validate", file))(app);
});

var server = app.listen(3000, function () {
    console.log('Server running on http://localhost:3000..');
});
