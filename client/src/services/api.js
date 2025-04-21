import axios from 'axios';

// Récupérer l'URL de l'API depuis les variables d'environnement
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Créer une instance axios avec la configuration correcte
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Important: permettre l'envoi de cookies
  withCredentials: true
});

console.log("API configurée avec l'URL:", API_URL);

// Fonction pour vérifier le statut du serveur
export const checkServerStatus = async () => {
  try {
    console.log("Tentative de vérification du statut sur:", API_URL + '/status');
    const response = await api.get('/status');
    console.log("Réponse du statut:", response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la vérification du statut du serveur:', error);
    throw error;
  }
};

export default api;
