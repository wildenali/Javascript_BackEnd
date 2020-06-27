var mysql = require('mysql');

// buat koneksi ke database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbrestapi'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('MySQL terkoneksi');
});

module.exports = conn;