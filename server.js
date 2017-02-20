'use strict'

// const http = require('http');s
// const staticServer = require('node-static');
// const file = new staticServer.Server('.');
const express = require('express')
const data = require('./data.js')

const app = express()

app.use(express.static(__dirname))
app.listen(3000)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/photo', (req, res) => {
  res.send(JSON.stringify(data.photos))
})




// http.createServer(function(req, res) {
//
//   if (req.url == '/photo') {
//     res.writeHead (200, {
//       'Content-Type': 'text/plain',
//       'Cache-Control': 'no-cache'
//     })
//
//     res.end(JSON.stringify(data))
//
//   } else {
//     file.serve(req, res);
//   }
//
// }).listen(3000);

console.log('Server running on port 3000');
