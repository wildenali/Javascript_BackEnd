var http = require('http');
var url = require('url');
var router = require('routes')();
var view = require('swig');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    database : "nodejs",
    user : "root",
    password : ""
});

const port = 4000;

router.addRoute('/', function (req,res) {
    connection.query("select * from mahasiswa", function (err, rows, field) {
        if (err) throw err;
        console.log(rows);
        rows.forEach(function(item) {
            console.log("Nama: " + item.nama + " - NIM: " + item.nim);
        });
        // res.end("Coba mysql");

        // nampilkan ke browser
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(JSON.stringify(rows));
    })
});

router.addRoute('/insert', function (req,res) {

    connection.query("insert into mahasiswa set ? ", {
        nim : 11710005,
        nama : 'Gehu',
        alamat : 'Papua'
    },function(err, field){
        if (err) throw err;
        
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(field.affectedRows + " record(s) updated");
    });

});

router.addRoute('/update', function (req,res) {
    connection.query("update mahasiswa set ? where ?",[
        { nama : "Aliw" },
        { nim : "11710001" }
    ], function (err, fields) {
        if(err) throw err;

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(fields.changedRows + " Rows Updated");
    });
});

router.addRoute('/delete', function (req,res) {
    connection.query("delete from mahasiswa where ?",{
        nim : "11710001" 
    }, function (err, fields) {
        if(err) throw err;

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(fields.affectedRows + " Rows Delete");
    });
});

http.createServer(function (req,res) {
    var path = url.parse(req.url).pathname;
    var match = router.match(path);
    if (match) {
        match.fn(req,res);
    } else {
        var html = view.compileFile('./012-404.html')();
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end(html);
    }
}).listen(port);

console.log(`Server jalan di sini http://localhost:${port}`)