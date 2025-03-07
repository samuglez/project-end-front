import React from 'react';

const RegistroForm = () => {
  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Fondo con efecto de desenfoque */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Contenedor del formulario centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="card w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-4">Registro</h1>
            <form className="space-y-4">
              {/* Campo de nombre */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  className="input input-bordered"
                />
              </div>

              {/* Campo de correo electrónico */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Correo electrónico</span>
                </label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="input input-bordered"
                />
              </div>

              {/* Campo de contraseña */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="input input-bordered"
                />
              </div>

              {/* Botón de registro */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </form>

            {/* Enlace para iniciar sesión */}
            <p className="mt-4 text-center">
              ¿Ya tienes una cuenta?{" "}
              <a href="/login" className="link link-primary">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;


