var http = require("http");
var fs = require('fs');
var url = require('url');
var qString = require('querystring');

const port = 4000;

http.createServer(function(req, res) {
    if(req.url != "/favicon.ico") {
        // 1. TEst dulud
        // var access = url.parse(req.url);
        // var file = "";
        // console.log(access);
        // console.log(access.query);
        // if (access.pathname == "/") {
        //     // kode = 200;
        //     file = "009-index.html";
        // } else if (access.pathname == "/contact") {
        //     // kode = 200;
        //     file = "009-contact.html";
        // } else {
        //     // kode = 404;
        //     file = "009-404.html";
        // }
        // res.writeHead(200, {"Content-Type" : "text/html"});
        // fs.createReadStream('./'+file).pipe(res)

        // 2. cara parse data
        // var access = url.parse(req.url);
        // var data = qString.parse(access.query);
        // console.log(data);
        // console.log(data.nama);
        // console.log(data.alamat);
        // res.end();

        // 3. kita kirim datanya
        var access = url.parse(req.url);
        if (access.pathname == "/") {
            var data = qString.parse(access.query);
            res.writeHead(200, {"Content-Type" : "text/plain"});
            res.end(JSON.stringify(data));
        }else if(access.pathname == "/form"){
            if(req.method.toUpperCase() == "POST"){
                // 1. cara cek dulu
                // res.writeHead(200, {"Content-Type" : "text/plain"});
                // res.end("Request nya post");

                // 2. cara ambil datanya
                var dataPost = "";
                req.on('data', function(chunck) {
                    dataPost += chunck;
                });
                req.on('end', function () {
                    console.log(dataPost);
                    dataPost = qString.parse(dataPost)
                    res.writeHead(200, {"Content-Type" : "text/plain"});
                    res.end(JSON.stringify(dataPost));
                })
            }else{  // GET
                res.writeHead(200, {"Content-Type" : "text/html"});
                fs.createReadStream('./009-form.html').pipe(res);
            }
        }else{
            res.writeHead(404, {"Content-Type" : "text/plain"});
            res.end("Page Not Found !!!");
        }
    }
}).listen(port);

console.log(`Server jalan di sini http://localhost:${port}`)