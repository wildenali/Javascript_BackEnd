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

// menampilkan semua data mahasiswa
exports.tampilBerdasarkanId = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};

// menambahkan data mahasiswa
exports.tambahMahasiswa = function(req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)',
        [nim, nama, jurusan],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("berhasil Menambahkan data Mahasiswa", res);
            }
        }
    );
};

// update data mahasiswa
exports.ubahMahasiswa = function(req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    
    connection.query('UPDATE mahasiswa SET nama=?, jurusan=? WHERE nim=?',
        [nama, jurusan, nim],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("berhasil UPDATE data Mahasiswa", res);
            }
        }
    );
};