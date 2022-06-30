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
});

io.listen(3000);
