import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import publicacionService from "../../services/publicacion.service";
import { AuthContext } from "../../context/auth.context";

function PublicacionesPage() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await publicacionService.getAllPublicaciones();
        setPublicaciones(response.data);
        setCargando(false);
      } catch (error) {
        console.error("Error obteniendo publicaciones", error);
        setCargando(false);
      }
    };

    fetchPublicaciones();
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center my-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Todas las Publicaciones</h1>
      </div>

      {publicaciones.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl mb-4">No hay publicaciones</h2>
            <p className="mb-6">¡Sé el primero en compartir tu experiencia de juego con la comunidad!</p>
            {isLoggedIn && (
              <button className="btn btn-primary" onClick={() => Navigate("/publicaciones/nueva")}>
                Crear mi primera publicación
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicaciones.map((publicacion) => (
            <div key={publicacion._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold">{publicacion.nombreJuego}</h2>
                <p className="text-base-content opacity-75 mb-4 line-clamp-3">
                  <strong>Trofeos/Logros:</strong> {publicacion.trofeosLogros}
                </p>
                <p className="text-base-content opacity-75 mb-4 line-clamp-3">
                  <strong>Duración:</strong> {publicacion.duracion}
                </p>
                <p className="text-base-content opacity-75 mb-4 line-clamp-3">
                  <strong>Dificultad:</strong> {publicacion.dificultad}
                </p>
                <p className="text-base-content opacity-75 mb-4 line-clamp-3">
                  <strong>Plataforma:</strong> {publicacion.plataforma}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-70">
                    {new Date(publicacion.createdAt).toLocaleDateString()}
                  </span>
                  <div className="card-actions justify-end">
                    <Link to={`/publicaciones/${publicacion._id}`} className="btn btn-sm btn-primary">
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicacionesPage;