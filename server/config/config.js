// ==============================
//  Puerto
// ==============================
process.env.PORT = process.env.PORT || 3000;

// ==============================
//  Entorno
// ==============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==============================
//  Base de Datos
// ==============================
let urlDB = '';
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URL_DB = urlDB;

// ==============================
//  Fecha de vencimiento
// ==============================
process.env.CADUCIDAD_TOKEN = '480h';

// ==============================
//  Seed
// ==============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// ==============================
//  Google Client ID
// ==============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '614273057780-chnn2elpdvk9d4g0od2cv4edejm57dls.apps.googleusercontent.com';