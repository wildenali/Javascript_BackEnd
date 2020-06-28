var connection = require('../102-koneksi');
var mysql = require('mysql');
// disini perlu install md5, untuk enkripsi password
var md5 = require('md5');
var response = require('../103-respon');
var jwt = require('jsonwebtoken');
var config = require('../106-config/105-secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = function(req,res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);
        }else {
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else {
                        response.ok("Berhasil menambahkan data user baru", res);
                    }
                });
            }else {
                response.ok("Email sudah terdaftar!",res);
            }
        }
    })
    /* 
    cara test register pake postman
    http://localhost:3000/auth/api/v1/registrasi

    username
    email
    password
    role
    tanggal_daftar
    */
}