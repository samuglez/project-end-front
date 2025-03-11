import "./ProfilePage.css";
import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import publicacionService from "../../services/publicacion.service";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { userId } = useParams();
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Usar el contexto de autenticación
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  // Usar useCallback para memoizar la función fetchUserPublicaciones
  const fetchUserPublicaciones = useCallback(async () => {
    try {
      const response = await publicacionService.getPublicacionesByUsuario(userId);
      setPublicaciones(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar las publicaciones");
      console.error("Error al cargar publicaciones:", error);
      setLoading(false);
    }
  }, [userId]); // userId como dependencia de la función

  // Efecto para cargar datos cuando el componente se monta o cambia el userId
  useEffect(() => {
    if (!isLoading) { // Esperar a que se cargue el estado de autenticación
      fetchUserPublicaciones();
    }
  }, [userId, isLoading, fetchUserPublicaciones]); // Incluir fetchUserPublicaciones en las dependencias

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

      {/* Información básica del perfil */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold">{user && isOwnProfile ? user.username || user.name : "Usuario"}</h2>
        
        {/* Mostrar botones de edición solo si es el perfil propio */}
        {isOwnProfile && (
          <div className="mt-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
              Editar Perfil
            </button>
          </div>
        )}
      </div>

      {/* Lista de publicaciones */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Publicaciones</h2>
        
        {isOwnProfile && (
          <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Nueva Publicación
          </button>
        )}
        
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion) => (
            <div key={publicacion._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl font-bold">{publicacion.nombreJuego}</h3>
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="badge badge-primary">Plataforma: {publicacion.plataforma}</span>
                  <span className="badge badge-secondary">Dificultad: {publicacion.dificultad}</span>
                  <span className="badge badge-accent">Duración: {publicacion.duracion}</span>
                  {publicacion.trofeosLogros && (
                    <span className="badge badge-info">Trofeos/Logros: {publicacion.trofeosLogros}</span>
                  )}
                </div>
                <p className="text-gray-700">{publicacion.contenido}</p>
                <div className="card-actions justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">
                    Publicado el: {new Date(publicacion.fechaPublicacion).toLocaleDateString()}
                    {publicacion.fechaActualizacion && 
                      ` (Actualizado: ${new Date(publicacion.fechaActualizacion).toLocaleDateString()})`}
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