import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import publicacionService from "../../services/publicacion.service";

function EditarPublicacionPage() {
  const { id } = useParams(); // Obtener el ID de la publicación desde la URL
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    nombreJuego: "",
    contenido: "",
    trofeosLogros: "",
    duracion: "",
    dificultad: "",
    plataforma: ""
  });
  
  const [cargando, setCargando] = useState(true);
  
  useEffect(() => {
    publicacionService
      .getPublicacion(id)
      .then((response) => {
        setForm(response.data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando la publicación", error);
        setCargando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    publicacionService
      .updatePublicacion(id, form)
      .then(() => {
        alert("Publicación actualizada con éxito");
        navigate("/mis-publicaciones"); // Redirigir a la lista de publicaciones
      })
      .catch((error) => console.error("Error actualizando la publicación", error));
  };

  if (cargando) {
    return <div className="flex justify-center my-12"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Editar Publicación</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-base-100 p-6 shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="label">Nombre del Juego</label>
          <input type="text" name="nombreJuego" value={form.nombreJuego} onChange={handleChange} className="input input-bordered w-full" required />
        </div>
        
        <div className="mb-4">
          <label className="label">Contenido</label>
          <textarea name="contenido" value={form.contenido} onChange={handleChange} className="textarea textarea-bordered w-full" required />
        </div>

        <div className="mb-4">
          <label className="label">Trofeos/Logros</label>
          <input type="text" name="trofeosLogros" value={form.trofeosLogros} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Duración</label>
          <input type="text" name="duracion" value={form.duracion} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Dificultad</label>
          <input type="text" name="dificultad" value={form.dificultad} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="mb-4">
          <label className="label">Plataforma</label>
          <input type="text" name="plataforma" value={form.plataforma} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="btn btn-outline" onClick={() => navigate("/mis-publicaciones")}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default EditarPublicacionPage;
