const express = require('express')
const app = express()
const port = 3000
app.get('/teste', (req, res) => res.send('Meu primeiro contato com a nuvem!!!'))
app.listen(port, () => console.log('App listening on port ${port}!'))
