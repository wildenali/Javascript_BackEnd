var http = require("http");
var url = require('url');
var Router = require('routes');
var routes = Router();
const port = 4000;

routes.addRoute('/', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Index Page");
});

routes.addRoute('/profile', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Pofile Page");
});

routes.addRoute('/form/:nama', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Form Page " + this.params.nama);
});

routes.addRoute('/data/:nama/:kota', function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Form Page " + this.params.nama + " dan berasa dari " + this.params.kota);
});

http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    var match = routes.match(path);
    if (match) {
        match.fn(req, res);
    }else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Page not Found");
    }
}).listen(port);

console.log(`Server jalan di sini http://localhost:${port}`)