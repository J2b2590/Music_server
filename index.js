const express = require('express');
const app = express();
const http = require('http');

const port = 8080;
app.set('port', port)

const server = http.createServer(app)
const io = require('socket.io').listen(server)
server.listen(port)

const users = []
const rooms = [
  {

    room: 'Rock',
    messages:[]
  },
  {
    room: 'Blues',
    messages: []
  },
  {
    room: 'Metal',
    messages: []

  },
  {
    room: 'Jazz',
    messages: []
  },
  {
    room: 'Funk',
    messages: []
  },
  {
    room: 'Classical',
    messages: []
  }
]


io.sockets.on('connect', (socket)=>{


		console.log('connected Music_Server')
		socket.emit('message', 'I am the socket from the server')

		socket.on('addUser', (username, room)=>{
      let user;
      users.forEach((u) => {
        if (u.username == username){
          user = u
        }
      })
      if (!user){
        users.push({


          username: username
        })        
      }

  		io.sockets.emit('rooms', rooms)
  	})

    socket.on('joinRoom', (username, room) => {
      const usersInRoom = [];
      let currentRoom
      users.forEach((user)=>{
        if(user.username == username){
          user.currentRoom = room.room
        }
        if(user.currentRoom == room.room){
          usersInRoom.push(user)
        }
      })
      rooms.forEach((r)=>{
        if(r.room == room.room  ){
            currentRoom = r
        }
      })

      io.sockets.emit('users', usersInRoom)
      socket.emit('messages', currentRoom.messages)

    })

    socket.on('addMessage',(message, room)=>{
      rooms.forEach((r)=>{
        if(room.room == r.room){
          r.messages.push(message)
          io.sockets.emit('messages', r.messages)
        }
      })
    })

	
})