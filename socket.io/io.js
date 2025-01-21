const http = require('http');
const socketIO = require('socket.io');

const ioConnection = (app) => {
  const server = http.createServer(app.callback());
  const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:8081',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('hi', (msg) => {
      console.log('hi');
    });
    socket.on('decision', (decision_id) => {
      socket.join(decision_id);
    });
    // socket.on('logRooms', () => {
    //   console.log(`Socket ${socket.id} is in rooms:`, [...socket.rooms]);
    // });
    socket.on('refresh', ({ room, msg }) => {
      socket.broadcast.to(room).emit('refresh', msg);
      console.log(msg);
    });
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });

  return server;
};

module.exports = ioConnection;
