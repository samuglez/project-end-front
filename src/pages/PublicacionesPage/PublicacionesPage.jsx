import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import publicacionService from "../../services/publicacion.service";
import { AuthContext } from "../../context/auth.context"; // Importamos el contexto de autenticación

function PublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { isLoggedIn } = useContext(AuthContext); // Obtenemos si el usuario está autenticado

  // Función para obtener todas las publicaciones
  const fetchPublicaciones = async () => {
    try {
      const response = await publicacionService.getAllPublicaciones();
      setPublicaciones(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar las publicaciones.");
      setLoading(false);
    }
  };

  // Efecto para cargar las publicaciones cuando el componente se monta
  useEffect(() => {
    fetchPublicaciones();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todas las Publicaciones</h1>
        
        {/* Mostrar botón solo si el usuario está autenticado */}
        {isLoggedIn && (
          <Link to="/publicaciones/nueva" className="btn btn-success">
            + Crear Publicación
          </Link>
        )}
      </div>

      {/* Lista de publicaciones */}
      <div className="space-y-6">
        {publicaciones.map((publicacion) => (
          <div key={publicacion._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold">{publicacion.nombreJuego}</h2>
              <p className="text-gray-700">{publicacion.contenido}</p>
              <div className="card-actions justify-between mt-4">
                <div className="space-y-2">
                  <span className="text-sm text-gray-500">
                    <strong>Trofeos/Logros:</strong> {publicacion.trofeosLogros}
                  </span>
                  <span className="text-sm text-gray-500">
                    <strong>Duración:</strong> {publicacion.duracion}
                  </span>
                  <span className="text-sm text-gray-500">
                    <strong>Dificultad:</strong> {publicacion.dificultad}
                  </span>
                  <span className="text-sm text-gray-500">
                    <strong>Plataforma:</strong> {publicacion.plataforma}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Publicado el: {new Date(publicacion.fechaPublicacion).toLocaleDateString()}
                </span>
              </div>

              {/* Botón para ver detalles y añadir comentarios */}
              <div className="mt-4">
                <Link to={`/publicaciones/${publicacion._id}`} className="btn btn-primary">
                  Ver Detalles y Comentar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicacionesPage;
