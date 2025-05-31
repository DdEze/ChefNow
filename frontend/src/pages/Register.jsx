import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';

function Register() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userAPI.post('/register', form);
      alert('Registrado correctamente. Iniciá sesión.');
      navigate('/iniciar-sesion');
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        /><br />
        <input
          name="surname"
          type="text"
          placeholder="Apellido"
          value={form.surname}
          onChange={handleChange}
          required
        /><br />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
