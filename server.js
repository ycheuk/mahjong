const express = require('express');
const app = express();

app.use(express.static(__dirname)); // Serve static files from the same directory

app.listen(3000, () => console.log('Server running at http://localhost:3000/')); // referenced from example

/*
example code:

const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/
