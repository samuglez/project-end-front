import { useState } from "react";
import { useNavigate } from "react-router-dom";
import publicacionService from "../../services/publicacion.service";

function CrearPublicacionPage() {
  const [form, setForm] = useState({
    nombreJuego: "",
    trofeosLogros: "",
    duracion: "",
    dificultad: "",
    contenido: "",
    plataforma: "PlayStation",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicacionService.createPublicacion({
        ...form,
        trofeosLogros: form.trofeosLogros.split(",").map((t) => t.trim()),
      });
      navigate("/publicaciones");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error al crear la publicación.");
    }
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 1rem)' }}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="card w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-4">Crear Publicación</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Nombre del Juego</span></label>
                <input type="text" name="nombreJuego" placeholder="Nombre del juego..." className="input input-bordered" value={form.nombreJuego} onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Trofeos/Logros (separados por coma)</span></label>
                <input type="text" name="trofeosLogros" placeholder="Ejemplo: Platino, 100% completado..." className="input input-bordered" value={form.trofeosLogros} onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Duración</span></label>
                <input type="text" name="duracion" placeholder="Tiempo estimado..." className="input input-bordered" value={form.duracion} onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Dificultad</span></label>
                <input type="text" name="dificultad" placeholder="Fácil, Difícil, Extremo..." className="input input-bordered" value={form.dificultad} onChange={handleChange} required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Contenido</span></label>
                <textarea name="contenido" placeholder="Escribe tu experiencia..." className="textarea textarea-bordered" value={form.contenido} onChange={handleChange} required></textarea>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Plataforma</span></label>
                <select name="plataforma" className="select select-bordered" value={form.plataforma} onChange={handleChange}>
                  <option value="PlayStation">PlayStation</option>
                  <option value="Xbox">Xbox</option>
                  <option value="Steam">Steam</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">Publicar</button>
              </div>
            </form>
            {errorMessage && <div className="alert alert-error mt-4"><span>{errorMessage}</span></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearPublicacionPage;
