// ini namanya harus index.js

var express = require('express');
var auth = require('./106-auth');
var router = express.Router();

// daftarkan menu registrasi
router.post('/api/v1/registrasi', auth.registrasi);

module.exports = router;