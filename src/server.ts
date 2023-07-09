import { Server } from 'socket.io';
import { error, success, warn } from './utils/terminal';

// Types
import { Message } from './types/message';

const socketServer = new Server(3000);

socketServer.on('connection', socket => {
  socket.on('login', async ({ data }: Message) => {
    socket.data.name = data;
    success(`${data} se conectou. ID: ${socket.id}`);
    const sockets = await socketServer.fetchSockets();
    for (const currentSocket of sockets) {
      if (currentSocket.id === socket.id) continue;
      currentSocket.emit('login', { data: `${data} se conectou.` } as Message);
    }
  });

  socket.on('text', async ({ data }: Message) => {
    warn(`${socket.data.name} enviou um texto. ID: ${socket.id}`);
    const sockets = await socketServer.fetchSockets();
    for (const currentSocket of sockets) {
      if (currentSocket.id === socket.id) continue;
      currentSocket.emit('text', {
        data: `${socket.data.name}: ${data}`,
      } as Message);
    }
  });

  socket.on('disconnect', async () => {
    error(`ID: ${socket.id} se desconectou.`);
    const sockets = await socketServer.fetchSockets();
    for (const currentSocket of sockets) {
      if (currentSocket.id === socket.id) continue;
      currentSocket.emit('logout', {
        data: `${socket.data.name} se desconectou.`,
      } as Message);
    }
  });
});

console.log('Servidor Iniciado!');
