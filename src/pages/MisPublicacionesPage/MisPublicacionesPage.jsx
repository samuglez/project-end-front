import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import publicacionService from "../../services/publicacion.service";
import { Link, useNavigate } from "react-router-dom";

function MisPublicacionesPage() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [misPublicaciones, setMisPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      setCargando(true);
      publicacionService
        .getPublicacionesByUsuario(user._id)
        .then((response) => {
          setMisPublicaciones(response.data);
          setCargando(false);
        })
        .catch((error) => {
          console.error("Error obteniendo publicaciones", error);
          setCargando(false);
        });
    }
  }, [isLoggedIn, user]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      publicacionService
        .deletePublicacion(id)
        .then(() => {
          setMisPublicaciones(misPublicaciones.filter((pub) => pub._id !== id));
        })
        .catch((error) => console.error("Error eliminando publicación", error));
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">Acceso Restringido</h2>
            <p>Necesitas iniciar sesión para ver tus publicaciones.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => navigate("/login")}>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Mis Publicaciones</h1>
        {isLoggedIn && (
          <Link to="/publicaciones/nueva" className="btn btn-success">
            + Crear Publicación
          </Link>
        )}
      </div>

      {cargando ? (
        <div className="flex justify-center my-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : misPublicaciones.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl mb-4">No tienes publicaciones</h2>
            <p className="mb-6">¡Comparte tu experiencia de juego con la comunidad!</p>
            <button className="btn btn-primary" onClick={() => navigate("/publicaciones/nueva")}>
              Crear mi primera publicación
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {misPublicaciones.map((publicacion) => (
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
                    <Link to={`/publicaciones/editar/${publicacion._id}`} className="btn btn-sm btn-primary">
                      Editar
                    </Link>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(publicacion._id)}>
                      Borrar
                    </button>
                    <Link to={`/comentarios/publicacion/${publicacion._id}`} className="btn btn-sm btn-info">
                      Ver Comentarios
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

export default MisPublicacionesPage;