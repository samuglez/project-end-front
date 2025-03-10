import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using the auth service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful, redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Fondo con efecto de desenfoque */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Contenedor del formulario centrado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="card w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-4">Registrarse</h1>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              {/* Campo de nombre */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre..."
                  className="input input-bordered"
                  value={name}
                  onChange={handleName}
                />
              </div>

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

              {/* Botón de registro */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>
              </div>
            </form>

            {/* Mensaje de error */}
            {errorMessage && (
              <div className="alert alert-error mt-4">
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Enlace para iniciar sesión */}
            <p className="mt-4 text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link to={"/login"} className="link link-primary">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;