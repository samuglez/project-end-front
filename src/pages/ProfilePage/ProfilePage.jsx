import "./ProfilePage.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import postService from "../../services/postService";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  
  // Usar el contexto de autenticación
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  // Función para obtener las publicaciones del usuario
  const fetchUserPosts = async () => {
    try {
      const response = await postService.getUserPosts(userId);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar las publicaciones");
      setLoading(false);
    }
  };

  // Función para cargar datos del perfil del usuario
  const fetchUserProfile = async () => {
    try {
      const profileResponse = await postService.getUserProfile(userId);
      setProfile(profileResponse.data);
    } catch (profileError) {
      console.error("Error al cargar el perfil:", profileError);
      // No establecemos error general para que las publicaciones aún puedan mostrarse
    }
  };

  // Efecto para cargar datos cuando el componente se monta o cambia el userId
  useEffect(() => {
    if (!isLoading) { // Esperar a que se cargue el estado de autenticación
      fetchUserPosts();
      fetchUserProfile();
    }
  }, [userId, isLoading]);

  // Verificar si estamos viendo nuestro propio perfil
  const isOwnProfile = isLoggedIn && user && user._id === userId;

  if (isLoading || loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {isOwnProfile ? "Mi Perfil" : "Perfil del Usuario"}
      </h1>

      {/* Información del perfil si está disponible */}
      {profile && (
        <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold">{profile.username || profile.name}</h2>
          {profile.bio && <p className="text-gray-600 mt-2">{profile.bio}</p>}
          {profile.email && <p className="text-gray-500 text-sm mt-1">{profile.email}</p>}
          
          {/* Mostrar botones de edición solo si es el perfil propio */}
          {isOwnProfile && (
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                Editar Perfil
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Cambiar Contraseña
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lista de publicaciones */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Publicaciones</h2>
        
        {isOwnProfile && (
          <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Nueva Publicación
          </button>
        )}
        
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Publicado el: {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  
                  {/* Mostrar opciones de edición/eliminación solo si es el perfil propio */}
                  {isOwnProfile && (
                    <div>
                      <button className="btn btn-sm btn-outline mr-2">Editar</button>
                      <button className="btn btn-sm btn-error btn-outline">Eliminar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
            No hay publicaciones para mostrar.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;