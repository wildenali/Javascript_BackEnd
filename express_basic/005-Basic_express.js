const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hellowwww'));
app.listen(port, () => console.log(`ini Contoh express.js di http://localhost:${port}`))