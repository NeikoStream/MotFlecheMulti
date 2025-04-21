const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configuration CORS correcte pour accepter les requêtes depuis le client Vite
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Les origines de votre client
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Middleware pour le parsing JSON
app.use(express.json());

// Route de test pour l'API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Le serveur API fonctionne correctement!',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date()
  });
});

// Configuration de Socket.IO avec les options CORS
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Gestion des connexions socket
io.on('connection', (socket) => {
  console.log('Nouvelle connexion socket:', socket.id);
  
  // Envoyer un message de bienvenue
  socket.emit('message', 'Bienvenue sur le serveur de jeu!');
  
  // Gérer la déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté:', socket.id);
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
