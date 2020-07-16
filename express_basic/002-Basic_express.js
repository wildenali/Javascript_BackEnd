const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', (req, res) => {
    const buah = [
        {name: 'apel'},
        {name: 'jeruk'},
        {name: 'mangga'},
    ]
    res.render('005-index',{
        name: 'ali',
        umur: 12,
        buah: buah
    })
});
app.get('/:name', (req, res) => res.send(`Nama saya adalah ${req.params.name}`))


app.listen(port, () => console.log(`ini Contoh express.js di http://localhost:${port}`))

// run nya pake nodemon aja
// nodemon 005-Basic_express.js