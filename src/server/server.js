var io = require('socket.io')
  , fs = require('fs')
  , http = require('http');

function start(rootDir) {
  function handler (req, res) {
    fs.readFile(rootDir + '/html/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
  }

  var server = http.createServer(handler).listen(8080);
  io = io.listen(server)

  io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', function (data) {
            console.log("Other data: " + data);
        });
      socket.on('clapping', function(data) {
        console.log("Clap Clap: " + JSON.stringify(data) + ", " + data.thing)
        console.log(new Date().getTime() + " : " + data.time)
        console.log("Time taken: " + ((new Date()).getTime() - data.time))
      });
  });

}

exports.start = start;
