var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

console.log("Starting...")
app.listen(80);
console.log("Listening...")

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

io.sockets.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
	        console.log("Other data: " + data);
		  });
    socket.on('clapping', function(data) {
      console.log("Clap Clap: " + data)
    });
});
