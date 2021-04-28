const http = require('http');

const requestListener = function (req, res) {
  if (req.url == '/index.html' || req.url == '/') {
    res.writeHead(200);
    res.end('Hello, World!');
  } else if (req.url == '/task1' || req.url == '/task1.html' )
    setTimeout(() => {
      res.writeHead(200);
      res.end('Hello, World!');
    }, Math.random()*1000+5000)
  }
}

const server = http.createServer(requestListener);
server.listen(8080);
