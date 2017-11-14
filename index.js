const express = require('express');
const app = express();
const http = require('http');

const port = 8080;
app.set('port', port)

const server = http.createServer(app)
const io = require('socket.io').listen(server)
server.listen(port)








app.set('view engine', 'ejs');

const usernames = {};
const messages  = [];
const rooms = [{

              room: 'Classic Rock',
              users: [],
              messages:[]
            },
            {
              room: 'Blues',
              users: [],
              messages: []
            },
            {
              room: 'Metal',
              users: [],
              messages: []

            },
            {
              room: 'Jazz',
              users: [],
              messages: []
            },
            {
              room: 'Funk',
              users: [],
              messages: []
            },
            {
              room: 'Classical',
              users: [],
              messages: []
            }]









io.sockets.on('connect', (socket)=>{
	console.log('connected Music_Server')
	socket.emit('message', 'I am the socket from the server')


	socket.on('addUser', (username)=>{
		console.log(username,'this is username')

		io.sockets.emit('rooms', rooms)
	})


	
})