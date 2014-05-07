var io = require('socket.io')
  , fs = require('fs')
  , http = require('http');

var claps = 0;

var routes = {}
routes['/'] = 'index.html';

function start(rootDir) {
  function handler (req, res) {
    // console.log(req + ", " + res);
    console.log(req['url'])
    // for(var key in req) {
    //   console.log(key + ", " + req[key]);
    // }
    var url = req['url'];
    if(routes.hasOwnProperty(url))
      url = routes[url]

    fs.readFile(rootDir + '/html/' + url,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + url);
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
        claps++;
      });
  });

}

function getNumClaps() {
  return claps;
}

exports.start = start;
