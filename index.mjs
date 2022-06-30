import {Server} from 'socket.io';

const io = new Server({
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.broadcast.emit('user connected', {
    userId: socket.id,
  });

  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });
});

io.listen(8000);
