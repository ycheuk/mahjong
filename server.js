const http = require('http');
const fs = require('fs'); // fs = reading and writing files
const path = require('path'); // path = file and directory paths

const hostname = '127.0.0.1'; // from example, need adjusting?
const port = 3000; // from example, need adjusting?

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') { // needed to be added because i'm not sure what favicon.ico is, so when asked i just say to return
    res.writeHead(204); // "no response"
    res.end(); // ignores rewuest for favicon.ico
    return;
  }

  let filePath = path.join(__dirname, req.url); // absolute file path

  if (fs.statSync(filePath).isDirectory()) { // appends index.html
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => { // https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs
    // 404 = not found, 200 = OK
    if (err) {
      res.writeHead(404); // needs fixing, spams "null" in console
      res.end('Not Found');
    }
    else {
      res.writeHead(200);
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => { // copied from example
  console.log(`Server running at http://${hostname}:${port}/`); // change if needed
});

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
