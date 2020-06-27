'use strict';

var response = require('./103-respon');
var connection = require('./102-koneksi');
const conn = require('./102-koneksi');

exports.index = function(req, res) {
    response.ok("Aplikasi REST API ku berjalan", res)
};

// menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};