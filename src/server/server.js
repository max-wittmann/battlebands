// var app = require('http').createServer(handler)
//   , io = require('socket.io').listen(app)
//   , fs = require('fs')

var io = require('socket.io')
  , fs = require('fs')
  , http = require('http');

function start() {
  function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
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

  // server.listen(80);
}

exports.start = start;
