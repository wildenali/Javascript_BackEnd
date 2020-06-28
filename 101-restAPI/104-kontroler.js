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
    
    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?',
        [nim, nama, jurusan, id],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("berhasil UPDATE data Mahasiswa", res);
            }
        }
    );
};

// Hapus data mahasiswa
exports.hapusMahasiswa = function(req, res) {
    var id = req.body.id_mahasiswa;
    
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',
        [id],
        function(error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok("berhasil HAPUS data Mahasiswa", res);
            }
        }
    );
};

// menampilkan matakuliah group
exports.tapilGroupMatakuliah = function(req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error, rows, fields) {
            if (error) {
                console.log(erros);
            } else {
                response.okNested(rows, res);
            }
        }
    )
}