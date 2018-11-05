// ==============================
//  Puerto
// ==============================
process.env.PORT = process.env.PORT || 3000;

// ==============================
//  Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==============================
//  Entorno
// ==============================
let urlDB = '';
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://cafe-user:abcDEF123@ds121282.mlab.com:21282/cafe';
}
process.env.URL_DB = urlDB;