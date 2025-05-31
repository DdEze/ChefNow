import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ ESTA ES LA BUENA

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/">Inicio</Link>{' '}
        {user && (
          <>
            | <Link to="/create">Crear receta</Link>{' '}
            | <Link to="/my-recipes">Mis recetas</Link>{' '}
            | <Link to="/favoritos">Favoritos</Link>
          </>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: '1rem' }}>Hola, {user.name || 'Usuario'}</span>
            <button onClick={logout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/iniciar-sesion">Iniciar sesión</Link> |{' '}
            <Link to="/registrarse">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
