import axios from 'axios';

class PostService {
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

  // GET /api/posts
  getAllPosts = async () => {
    return this.api.get('/api/posts');
  }

  // GET /api/posts/:id
  getPost = async (id) => {
    return this.api.get(`/api/posts/${id}`);
  }

  // GET /api/users/:userId/posts
  getUserPosts = async (userId) => {
    return this.api.get(`/api/users/${userId}/posts`);
  }

  // GET /api/users/:userId/profile
  getUserProfile = async (userId) => {
    return this.api.get(`/api/users/${userId}/profile`);
  }

  // POST /api/posts
  createPost = async (requestBody) => {
    return this.api.post('/api/posts', requestBody);
  }

  // PUT /api/posts/:id
  updatePost = async (id, requestBody) => {
    return this.api.put(`/api/posts/${id}`, requestBody);
  }

  // DELETE /api/posts/:id
  deletePost = async (id) => {
    return this.api.delete(`/api/posts/${id}`);
  }
}

// Create one instance of the service
const postService = new PostService();

export default postService;