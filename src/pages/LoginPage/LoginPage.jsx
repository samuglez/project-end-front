import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { AuthContext } from "../../context/auth.context"; // Importamos el contexto

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext); // Obtenemos las funciones necesarias

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.login({ email, password });

      if (response.data.authToken) {
        storeToken(response.data.authToken); // Guarda el token
        authenticateUser(); // Actualiza el estado global
        navigate("/"); // Redirigir al inicio
      }
    } catch (error) {
      setErrorMessage("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Fondo con efecto de desenfoque */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Contenedor del formulario centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="card w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-4">Iniciar Sesión</h1>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Campo de correo electrónico */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Tu email..."
                  className="input input-bordered"
                  value={email}
                  onChange={handleEmail}
                />
              </div>

              {/* Campo de contraseña */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>
                <input
                  type="password"
                  placeholder="Tu contraseña..."
                  className="input input-bordered"
                  value={password}
                  onChange={handlePassword}
                />
              </div>

              {/* Botón de inicio de sesión */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Iniciar Sesión
                </button>
              </div>
            </form>

            {/* Mensaje de error */}
            {errorMessage && (
              <div className="alert alert-error mt-4">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Enlace para registrarse */}
            <p className="mt-4 text-center">
              ¿No tienes una cuenta?{" "}
              <Link to={"/signup"} className="link link-primary">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
