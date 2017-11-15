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

    room: 'Classic Rock',
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


		socket.on('addUser', (username)=>{
			console.log(username,'this is username')

		usernames[username] = socket.id;
	    
	    socket.username = username;
	    
	    socket.currentRoom = rooms[0].room;
	//this is putting the user into the room
	    rooms[0].users.push(username)
	//tell the socket to join that room
	    socket.join(rooms[0].room)

	    io.sockets.emit('users', rooms[0].users, rooms[0].room);

		io.sockets.emit('rooms', rooms)
	})

		// socket.on('message', (message)=>{
  //   const obj = {};
  //   obj.username = socket.username;
  //   obj.message = message;
  //   messages.push(obj);
  //   io.sockets.emit('messages', messages)
  //   console.log(message)
  // })

		// socket.on('join room', (roomName)=>{


  //   //this was finding the room the user was in
  //   const indexOfCurrentRoom = rooms.findIndex(x => x.room === socket.currentRoom)
  //  //we want to remove the user from that array

  //  //find the index of the user in that array
  //  const indexOfUser = rooms[indexOfCurrentRoom].users.indexOf(socket.username);

  //  rooms[indexOfCurrentRoom].users.splice(indexOfUser, 1);
  //  //we want to tell the socket to leave that room
  //  socket.leave(socket.currentRoom);
  //  io.sockets.to(socket.currentRoom).emit('users', rooms[indexOfCurrentRoom].users, socket.currentRoom)




  //  //Prepare for the next Room

  //  //finding the index number of what we want to choose
  //  const indexOfNextRoom = rooms.findIndex(x => x.room === roomName);

  //   rooms[indexOfNextRoom].users.push(socket.username);

  //   socket.join(roomName);

  //   socket.currentRoom = roomName
  //   io.sockets.to(roomName).emit('users', rooms[indexOfNextRoom].users, socket.currentRoom)


  // })



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

      socket.emit('users', usersInRoom)
      socket.emit('messages', currentRoom.messages)

    })

    socket.on('addMessage',(message, room)=>{
      rooms.forEach((r)=>{
        if(room.room == r.room){
          r.messages.push(message)
          socket.emit('messages', r.messages)
        }
      })
    })

	
})