const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan');     // masukan morgan ini saat latihan di 106
const app = express();

const port = 3000;

// parser application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev')); // masukan morgan ini saat latihan di 106

// 105-routes, panggil routes
var routes = require('./105-routes');
routes(app);

//daftarkan menu routes dari index, ini saat latihan di 106
app.use('/auth', require('./106-middleware'))


app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});


// ini sumber nya dari Youtube Ipung Dev