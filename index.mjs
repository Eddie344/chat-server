import {Server} from 'socket.io';

const io = new Server({
  cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  const userName = socket.handshake.auth.userName;
  if (!userName) {
    return next(new Error('invalid username'));
  }
  socket.userName = userName;
  next();
});

io.on('connection', (socket) => {
  socket.broadcast.emit('user connected', {
    userName: socket.userName,
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });
});

io.listen(process.env.PORT || 8000);
