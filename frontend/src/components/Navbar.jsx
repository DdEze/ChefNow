import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">ChefNow 🍳</Link>
        {user && (
          <>
            <Link to="/create">Crear receta</Link>
            <Link to="/my-recipes">Mis recetas</Link>
            <Link to="/favoritos">Favoritos</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/perfil">
              <span className="navbar-user">
                Hola, {user?.surname && user?.name ? `${user.surname} ${user.name}` : 'Usuario'}
              </span>
            </Link>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/iniciar-sesion">Iniciar sesión</Link>
            <Link to="/registrarse">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
