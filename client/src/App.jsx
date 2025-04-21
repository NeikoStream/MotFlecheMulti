import { useEffect, useState } from 'react';
import { checkServerStatus } from './services/api';
import { initializeSocket, closeSocket } from './services/socket';
import './App.css';

function App() {
  const [serverStatus, setServerStatus] = useState('checking...');
  const [socketStatus, setSocketStatus] = useState('disconnected');

  useEffect(() => {
    // Vérifier l'état de l'API
    const checkStatus = async () => {
      try {
        const data = await checkServerStatus();
        setServerStatus(`connected (${data.message})`);
      } catch (error) {
        setServerStatus('error connecting to API server');
      }
    };

    checkStatus();

    // Initialiser la connexion Socket.IO
    const socket = initializeSocket();
    
    socket.on('connect', () => {
      setSocketStatus('connected');
    });
    
    socket.on('disconnect', () => {
      setSocketStatus('disconnected');
    });

    // Nettoyage à la destruction du composant
    return () => {
      closeSocket();
    };
  }, []);

  return (
    <div className="app">
      <h1>Jeu de Mots Fléchés Multijoueur</h1>
      <div className="status-container">
        <p><strong>API Status:</strong> {serverStatus}</p>
        <p><strong>Socket Status:</strong> {socketStatus}</p>
      </div>
    </div>
  );
}

export default App;
