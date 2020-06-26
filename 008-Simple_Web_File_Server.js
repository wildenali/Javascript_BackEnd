var http = require("http");
var fs = require('fs')

const port = 4000;

http.createServer(function(req, res) {
    var kode = 0;
    var file = "";

    if (req.url == "/") {
        // index
        kode = 200;
        file = "008-index.html";
    } else if (req.url == "/contact") {
        kode = 200;
        file = "008-contact.html";
    } else {
        kode = 404;
        file = "008-404.html";
    }

    res.writeHead(kode, {"Content-Type" : "text/html"});
    fs.createReadStream('./'+file).pipe(res)
}).listen(port);

console.log(`Server jalan di sini http://localhost:${port}`)