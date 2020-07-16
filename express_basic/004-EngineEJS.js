const express = require('express');
const app = express()
const port = 3000

// ambil contohnya dari https://expressjs.com/en/advanced/developing-template-engines.html
app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.get('/', (req, res) => {
    res.render('004-index')
})

app.get('/:name', (req, res) => res.send(`Nama saya: ${req.params.name}`))

app.listen(port, () => console.log(`Contoh app listening at http://localhost:${port}`))