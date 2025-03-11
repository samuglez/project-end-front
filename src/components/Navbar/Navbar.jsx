import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser(); // Cerrar sesión
    navigate("/"); // Redirigir a la página de inicio
  };

  return (
    <div className="navbar bg-base-100 shadow-lg h-16">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/publicaciones" className="font-medium">Publicaciones</Link></li>
            <li><Link to="/comentarios" className="font-medium">Comentarios</Link></li>
            {!isLoggedIn && (
              <>
                <li><Link to="/signup" className="font-medium">Registrarse</Link></li>
                <li><Link to="/login" className="font-medium">Iniciar Sesión</Link></li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">TrophyWorld</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/publicaciones" className="font-medium text-lg">Publicaciones</Link></li>
          <li><Link to="/comentarios" className="font-medium text-lg">Comentarios</Link></li>
          {!isLoggedIn && (
            <>
              <li><Link to="/signup" className="font-medium text-lg">Registrarse</Link></li>
              <li><Link to="/login" className="font-medium text-lg">Iniciar Sesión</Link></li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <div className="form-control">
            <input type="text" placeholder="Buscar..." className="input input-bordered w-24 md:w-auto" />
          </div>

          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img 
                    alt="Perfil de usuario" 
                    src={user?.profileImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                  />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/perfil" className="justify-between">
                    Perfil
                    <span className="badge">Nuevo</span>
                  </Link>
                </li>
                <li><Link to="/ajustes">Ajustes</Link></li>
                <li><button onClick={handleLogout}>Cerrar sesión</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;