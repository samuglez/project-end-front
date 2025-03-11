import axios from 'axios';

class ComentarioService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // Obtener todos los comentarios
  getAllComentarios = async () => {
    return this.api.get("/api/comentarios");
  };

  // Obtener comentarios de una publicación específica
  getComentariosByPublicacion = async (publicacionId) => {
    return this.api.get(`/api/comentarios/publicacion/${publicacionId}`);
  };

  // Crear un nuevo comentario
  createComentario = async (publicacionId, content) => {
    return this.api.post(`/api/comentarios/publicacion/${publicacionId}`, { content });
  };

  // Eliminar un comentario
  deleteComentario = async (id) => {
    return this.api.delete(`/api/comentarios/${id}`);
  };
}

// Crear una instancia del servicio
const comentarioService = new ComentarioService();

export default comentarioService;