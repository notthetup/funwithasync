#!/bin/env node

const http = require('http');

const requestListener = function (req, res) {
  if (req.url == '/index.html' || req.url == '/') {
    console.log(`Req: from ${req.socket.localAddress}, for ${req.url}`)
    res.writeHead(200);
    res.end('Hello, World!');
  } else if (req.url.indexOf('/i/') === 0){
    let v = Math.ceil(Math.random()*10)
    console.log(`Req: from ${req.socket.localAddress}, at ${req.url} : replying immediately`)
    res.writeHead(200);
    res.end(`${v}`);
  } else if (req.url.indexOf('/s/') === 0){
    let v = Math.ceil(Math.random()*10)
    console.log(`Req: from ${req.socket.localAddress}, at ${req.url} : delaying for 10s`)
    setTimeout(() => {
      res.writeHead(200);
      res.end(`${v}`);
    }, 10000);
  } else if (req.url.indexOf('/r/') === 0){
    let v = Math.ceil(Math.random()*10)
    let d = Math.random()*9000+1000;
    console.log(`Req: from ${req.socket.localAddress}, at ${req.url} : delaying for ${(d/1000).toFixed(2)}s`)
    setTimeout(() => {
      res.writeHead(200);
      res.end(`${v}`);
    }, d);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
console.log("Started funwithasync server on http://localhost:8080")
