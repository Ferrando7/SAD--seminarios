var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('chat message', { "user" : "Server", "msg":"A user has conected to the chat"});
  socket.on('disconnect', function(){
    io.emit('chat message', { "user" : "Server", "msg":"A user has disconected" });
    console.log('user disconnected');
  });
  socket.on('chat message', function(data){
    console.log('User: ' + data.user + ' message: ' + data.msg);
    io.emit('chat message', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
