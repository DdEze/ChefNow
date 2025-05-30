import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/">Inicio</Link> |{' '}
      {user ? (
        <>
          <Link to="/favoritos">Favoritos</Link> |{' '}
          <button onClick={logout}>Salir</button>
        </>
      ) : (
        <>
          <Link to="/iniciar-sesion">Login</Link> |{' '}
          <Link to="/registrarse">Registro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
