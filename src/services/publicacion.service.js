import axios from 'axios';

class PublicacionService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET /api/publicaciones - Obtener todas las publicaciones
  getAllPublicaciones = async () => {
    return this.api.get('/api/publicaciones');
  }

  // POST /api/publicaciones - Crear una nueva publicación
  createPublicacion = async (publicacionData) => {
    return this.api.post('/api/publicaciones', publicacionData);
  }

  // PUT /api/publicaciones/:id - Actualizar una publicación existente
  updatePublicacion = async (id, publicacionData) => {
    return this.api.put(`/api/publicaciones/${id}`, publicacionData);
  }

  // DELETE /api/publicaciones/:id - Eliminar una publicación
  deletePublicacion = async (id) => {
    return this.api.delete(`/api/publicaciones/${id}`);
  }

  // Si necesitas una función para obtener publicaciones de un usuario específico
  // (esto no está en tu router, pero podrías implementarlo)
  getPublicacionesByUsuario = async (usuarioId) => {
    // Suponiendo que implementarás esta ruta en el backend
    return this.api.get(`/api/publicaciones/usuario/${usuarioId}`);
  }

  // GET /api/publicaciones/:id - Obtener una publicación específica por ID
  // (esto no está en tu router, pero podrías implementarlo)
  getPublicacion = async (id) => {
    return this.api.get(`/api/publicaciones/${id}`);
  }
}

// Create one instance of the service
const publicacionService = new PublicacionService();

export default publicacionService;