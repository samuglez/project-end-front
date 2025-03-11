import React, { useState } from "react";
import comentarioService from "../../services/comentario.service";

function ComentarioForm({ publicacionId, onComentarioAdded }) {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content === "") {
      setErrorMessage("Por favor, escribe un comentario.");
      return;
    }

    try {
      // Enviar la solicitud para crear el comentario
      await comentarioService.createComentario(publicacionId,  content );
      setContent("");
      setErrorMessage("");
      onComentarioAdded(); // Actualizar la lista de comentarios
    } catch (error) {
      setErrorMessage("Error al crear el comentario. Inténtalo de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <textarea
          placeholder="Escribe tu comentario..."
          className="textarea textarea-bordered w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
      {errorMessage && (
        <div className="alert alert-error mt-4">
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}

export default ComentarioForm;