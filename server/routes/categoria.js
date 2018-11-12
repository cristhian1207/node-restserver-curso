const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion.js');
const _ = require('underscore');
const app = express();
const Categoria = require('../models/categoria');


app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoria) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            res.json({
                ok: true,
                categoria
            });
        });
});

app.get('/categoria/:id', verificaToken, (req, res) => {
    Categoria.findById(req.params.id)
        .exec((err, categoria) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            res.json({
                ok: true,
                categoria
            });
        });
});

app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: categoriaDB
        });
    });
});

app.delete('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Categoría no encontrada.'
                    }
                });
            }
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

module.exports = app;