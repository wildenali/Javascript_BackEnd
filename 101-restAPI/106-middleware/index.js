// ini namanya harus index.js

var express = require('express');
var auth = require('./106-auth');
var verifikasi = require('./106-verifikasi');
var router = express.Router();

// daftarkan menu registrasi
router.post('/api/v1/registrasi', auth.registrasi);

// daftarkan menu login
router.post('/api/v1/login', auth.login);

// alamat yg perlu otorisasi
router.get('/api/v1/rahasia', verifikasi(), auth.halamanRahasia);

module.exports = router;