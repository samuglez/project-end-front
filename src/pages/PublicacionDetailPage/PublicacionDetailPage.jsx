import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import publicacionService from "../../services/publicacion.service";
import ComentarioForm from "../../components/ComentarioForm/ComentarioForm";

function PublicacionDetailPage() {
  const { publicacionId } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función para obtener los detalles de la publicación
  const fetchPublicacion = async () => {
    try {
      const response = await publicacionService.getPublicacion(publicacionId);
      setPublicacion(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al cargar la publicación.");
      setLoading(false);
    }
  };

  // Efecto para cargar los detalles de la publicación cuando el componente se monta
  useEffect(() => {
    fetchPublicacion();
  }, [publicacionId]);

  // Función para actualizar la lista de comentarios después de añadir uno nuevo
  const handleComentarioAdded = () => {
    fetchPublicacion(); // Recargar los detalles de la publicación para mostrar el nuevo comentario
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Detalles de la Publicación</h1>

      {/* Detalles de la publicación */}
      <div className="card bg-base-100 shadow-xl">
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
        </div>
      </div>

      {/* Formulario para añadir comentarios */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Añadir un comentario</h2>
        <ComentarioForm publicacionId={publicacionId} onComentarioAdded={handleComentarioAdded} />
      </div>

      {/* Lista de comentarios */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Comentarios</h3>
        {publicacion.comentarios && publicacion.comentarios.length > 0 ? (
          publicacion.comentarios.map((comentario) => (
            <div key={comentario._id} className="card bg-base-200 shadow-sm mt-2">
              <div className="card-body">
                <h4 className="card-title text-lg font-bold">
                  {comentario.usuario ? comentario.usuario.name : "Usuario desconocido"}
                </h4>
                <p className="text-gray-700">{comentario.content}</p>
                <span className="text-sm text-gray-500">
                  {new Date(comentario.fechaComentario).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay comentarios para mostrar.</p>
        )}
      </div>

      {/* Botón para volver a la lista de publicaciones */}
      <div className="mt-6">
        <Link to="/publicaciones" className="btn btn-secondary">
          Volver a Publicaciones
        </Link>
      </div>
    </div>
  );
}

export default PublicacionDetailPage;