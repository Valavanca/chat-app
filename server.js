'use strict'

const express = require('express')
const data = require('./data.js')

const app = express()

app.use(express.static(__dirname))
app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/photos', (req, res) => {
  res.send(JSON.stringify(data.photos))
})

console.log('Server running on port 3000');
