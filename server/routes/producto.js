const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const _ = require('underscore');

let app = express();
let Producto = require('../models/producto');

app.get('/producto', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre emai')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });
});

app.get('/producto/:id', (req, res) => {
    Producto.findById(req.params.id)
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'El producto no existe.'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });
});

app.get('/producto/buscar/:termino', verificaToken, (req, res) => {
    let termino = req.params.termino;
    let regExp = new RegExp(termino, 'i');
    Producto.find({ nombre: regExp })
        .populate('categoria')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            });
        });
});

app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});

app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion'])
    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                error: err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'El ID no existe.'
                }
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    error: err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'El ID no existe.'
                    }
                });
            }
            productoDB.disponible = false;
            productoDB.save((err, productoAct) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        error: err
                    });
                }
                res.json({
                    ok: true,
                    message: `El producto ya "${productoDB.nombre}" no estará disponible`,
                    producto: productoDB
                });
            });
        });
});

module.exports = app;