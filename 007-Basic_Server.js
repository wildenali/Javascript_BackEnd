var http = require("http");
const port = 4000;

http.createServer(function(req, res) {
    if (req.url != "favicon.ico") {
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.write("Helow kamu req " + req.url);
        res.end();
    }
}).listen(port);

console.log(`Server jalan di sini http://localhost:${port}`)