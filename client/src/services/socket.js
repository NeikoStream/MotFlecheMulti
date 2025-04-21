import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

let socket;

export const initializeSocket = () => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('Connecté au serveur de jeu:', socket.id);
  });

  socket.on('welcome', (data) => {
    console.log('Message du serveur:', data.message);
  });

  socket.on('connect_error', (error) => {
    console.error('Erreur de connexion au serveur:', error);
  });

  socket.on('disconnect', () => {
    console.log('Déconnecté du serveur de jeu');
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
