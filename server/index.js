const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();

// Configuration des middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Routes API
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Le serveur API fonctionne correctement!',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Création du serveur HTTP
const server = http.createServer(app);

// Configuration de Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Nouvelle connexion socket:', socket.id);
  
  // Test de connexion
  socket.emit('welcome', { message: 'Bienvenue sur le serveur de jeu!' });
  
  socket.on('disconnect', () => {
    console.log('Déconnexion socket:', socket.id);
  });
});

// Configuration du port et démarrage du serveur
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API disponible à http://localhost:${PORT}/api`);
  console.log(`Socket.IO configuré pour accepter les connexions de ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`);
});
