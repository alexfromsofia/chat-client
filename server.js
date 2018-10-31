const express = require('express');
const socket = require('socket.io');

const app = express();
const constants = require('./client/src/constants');


server = app.listen(8080, function(){
  console.log('server is running on port 8080')
});

io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on(constants.SEND_MESSAGE, function(data){
    io.emit(constants.RECEIVE_MESSAGE, data);
  })
});