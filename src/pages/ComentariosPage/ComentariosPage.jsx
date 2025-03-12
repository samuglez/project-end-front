import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import comentarioService from "../../services/comentario.service";

function ComentariosPage() {
  const { publicacionId } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!publicacionId) {
      console.error("El ID de la publicación es undefined.");
      setCargando(false);
      return;
    }

    // Llama al servicio para obtener los comentarios de la publicación
    comentarioService
      .getComentariosByPublicacion(publicacionId)
      .then((response) => {
        setComentarios(response.data); // Guarda los comentarios en el estado
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error obteniendo comentarios", error);
        setCargando(false);
      });
  }, [publicacionId]);

  if (cargando) {
    return <div>Cargando comentarios...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Comentarios de la Publicación</h1>
      {comentarios.length === 0 ? (
        <p>No hay comentarios para esta publicación.</p>
      ) : (
        <div className="space-y-4">
          {comentarios.map((comentario) => (
            <div key={comentario._id} className="card bg-base-100 shadow-md p-4">
              <div className="flex items-center mb-2">
                {/* Muestra el nombre del usuario */}
                <span className="font-bold text-primary">{comentario.usuario.name}</span>
                <span className="text-sm opacity-70 ml-2">
                  {new Date(comentario.fechaComentario).toLocaleDateString()}
                </span>
              </div>
              <p>{comentario.content}</p> {/* Muestra el contenido del comentario */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComentariosPage;