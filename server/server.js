require('./config/config.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/index.js'));

let depWarnings = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(process.env.URL_DB, depWarnings, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE.');
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", process.env.PORT);
});