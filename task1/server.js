const http = require('http');

const requestListener = function (req, res) {
  if (req.url == '/index.html' || req.url == '/') {
    console.log(`Req: from ${req.socket.localAddress}, at ${req.url}`)
    res.writeHead(200);
    res.end('Hello, World!');
  } else if (req.url == '/task1' || req.url == '/task1.html' ){
    let d = Math.random()*10000+5000;
    console.log(`Req: from ${req.socket.localAddress}, at ${req.url} : delaying for ${d}`)
    setTimeout(() => {
      res.writeHead(200);
      res.end('Hello, World!');
    }, d)
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
console.log("Started task1 server on http://localhost:8080")
