import React, { useEffect, useState } from "react";
import publicacionService from "../../services/publicacion.service"; // Importa el servicio de publicaciones

function AllPostsPage() {
  const [posts, setPosts] = useState([]); // Estado para almacenar las publicaciones
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener todas las publicaciones
  const fetchAllPosts = async () => {
    try {
      const response = await publicacionService.getAllPublicaciones(); // Llama al servicio
      setPosts(response.data); // Almacena las publicaciones en el estado
      setLoading(false); // Indica que la carga ha terminado
    } catch (error) {
      setError("Error al cargar las publicaciones"); // Maneja el error
      setLoading(false); // Indica que la carga ha terminado
    }
  };

  // Efecto para cargar las publicaciones cuando el componente se monta
  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>; // Mensaje de carga
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>; // Mensaje de error
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Todas las Publicaciones</h1>

      {/* Lista de publicaciones */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">
                  {post.nombreJuego}
                </h2>
                <p className="text-gray-700">{post.contenido}</p>
                <div className="card-actions justify-between mt-4">
                  <div className="space-y-2">
                    <span className="text-sm text-gray-500">
                      <strong>Trofeos/Logros:</strong> {post.trofeosLogros}
                    </span>
                    <span className="text-sm text-gray-500">
                      <strong>Duración:</strong> {post.duracion}
                    </span>
                    <span className="text-sm text-gray-500">
                      <strong>Dificultad:</strong> {post.dificultad}
                    </span>
                    <span className="text-sm text-gray-500">
                      <strong>Plataforma:</strong> {post.plataforma}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Publicado el:{" "}
                    {new Date(post.fechaPublicacion).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay publicaciones para mostrar.
          </p>
        )}
      </div>
    </div>
  );
}

export default AllPostsPage;
