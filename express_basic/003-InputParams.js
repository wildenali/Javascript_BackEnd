const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hellow Berubah'))
app.get('/:name', (req, res) => res.send(`Nama saya: ${req.params.name}`))

app.listen(port, () => console.log(`Contoh app listening at http://localhost:${port}`))