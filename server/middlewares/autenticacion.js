const jwt = require('jsonwebtoken');
// ==============================
//  Verificar Token
// ==============================
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    });

};

// ==============================
//  Verificar ADMIN_ROLE
// ==============================
let verificaAdminRole = (req, res, next) => {
    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador.'
            }
        });
    } else {
        next();
    }
};

// ==============================
//  Verificar Token para Imágen
// ==============================
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    });

};

module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
};