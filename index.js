const express = require('express');
const app = express();
const http = require('http');

const port = 8080;
app.set('port', port)

const server = http.createServer(app)
const io = require('socket.io').listen(server)
server.listen(port)


const users = [] // { username: 'Bob123', currentRoom: "Metal"}
const rooms = [
  {
    room: 'Rock',
    messages:[] // {username: 'Bob123', text: 'My Thing'}
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
      users.forEach((u) => { //u = one user
        if (u.username == username){//going over all the usernames to see if it exists
          user = u // i found the user by username and going to toss in the "bucket"
        }
      })
      if (!user){ 
        users.push({


          username: username
        })        
      }

  		io.sockets.emit('rooms', rooms)// client sees all of the rooms
  	})
//
    socket.on('joinRoom', (username, genre) => {
      let currentRoom
      users.forEach((user)=>{
        // updating the room the user is in
        if(user.username == username){
          user.currentRoom = genre.room
        }
      })

      io.sockets.emit('users', users)
      socket.emit('rooms', rooms)

    })

    socket.on('addMessage',(message, room)=>{
      rooms.forEach((r)=>{
        if(room.room == r.room){
          r.messages.push(message)
          io.sockets.emit('rooms', rooms)
        }
      })
    })

	
})