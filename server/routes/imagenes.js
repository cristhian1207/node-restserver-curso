const exprees = require('express');
const fs = require('fs');
const path = require('path');

const { verificaTokenImg } = require('../middlewares/autenticacion');

let app = exprees();

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    if (fs.existsSync(pathImg)) {
        return res.sendFile(pathImg);
    }

    let pathNoImage = path.resolve(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathNoImage);
});

module.exports = app;