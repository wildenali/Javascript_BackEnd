var http = require('http');
var url = require('url');
var qString = require('querystring');
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
        
        var html = view.compileFile('./013-index.html')({
            title : "Data Mahasiswa",
            data : rows
        });
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    });
});

router.addRoute('/insert', function (req,res) {
    if (req.method.toUpperCase() == "POST") {
        var dataPost = "";
        req.on('data', function (chuncks) {
            dataPost += chuncks;
        });

        req.on('end', function () {
            dataPost = qString.parse(dataPost);
            console.log(dataPost);
            
            connection.query("insert into mahasiswa set ? ", dataPost,
                function(err, field){
                    if (err) throw err;
                    
                    res.writeHead(302, {"Location": "/"});
                    res.end();
                }
            );
        });
    } else {
        var html = view.compileFile('./013-form.html')();
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.end(html);
    }

});

router.addRoute('/update/:id', function (req,res) {
    connection.query("select * from mahasiswa where ?",
        { nim : this.params.id },
        function(err,rows,field) {
            if (rows.length) {
                var data = rows[0];
                if (req.method.toUpperCase() == "POST") {
                    var dataPost = "";
                    req.on('data', function (chuncks) {
                        dataPost += chuncks;
                    });

                    req.on('end', function () {
                        dataPost = qString.parse(dataPost);
                        console.log(dataPost);
                        connection.query("update mahasiswa set ? where ?",[
                                dataPost,
                                { nim : data.nim }
                            ], function (err, fields) {
                                if(err) throw err;

                                res.writeHead(302, {"Location": "/"});
                                res.end();
                            }
                        );
                    })
                } else {
                    var html = view.compileFile('./013-form_update.html')({
                        data : data
                    });
                    res.writeHead(200, {"Content-Type" : "text/html"});
                    res.end(html);
                }
            } else {
                var html = view.compileFile('./013-404.html')();
                res.writeHead(404, {"Content-Type": "text/html"});
                res.end(html);
            }
        }
    );
});

router.addRoute('/delete/:id', function (req,res) {
    connection.query("delete from mahasiswa where ?",{
        nim : this.params.id
    }, function (err, fields) {
        if(err) throw err;

        res.writeHead(302, {"Location": "/"});
        res.end();
    });
});

http.createServer(function (req,res) {
    var path = url.parse(req.url).pathname;
    var match = router.match(path);
    if (match) {
        match.fn(req,res);
    } else {
        var html = view.compileFile('./013-404.html')();
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end(html);
    }
}).listen(port);

console.log(`Server jalan di sini http://localhost:${port}`)