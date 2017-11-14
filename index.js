const express = require('express');
const app = express();
const http = require('http');

const port = 8080;
app.set('port', port)

const server = http.createServer(app)
const io = require('socket.io').listen(server)
server.listen(port)








app.set('view engine', 'ejs');









io.sockets.on('connect', (socket)=>{
	console.log('connected')
	socket.emit('message', 'I am the socket')
	
})