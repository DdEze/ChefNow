import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    try {
      const res = await api.post('/users/change-password', {
        currentPassword,
        newPassword
      });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cambiar contraseña');
      setMessage('');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.')) return;

    try {
      await api.delete('/users/delete');
      logout();
      navigate('/iniciar-sesion');
    } catch (err) {
      setError('No se pudo eliminar la cuenta');
    }
  };

  return (
    <div className="form-container">
      <h2>{user ? `${user.surname} ${user.name}` : 'Usuario'}</h2>

      <div>
        <h3>Cambiar Contraseña</h3>
        <div className="form-group">
            <input
                type="password"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
            <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
        </div>
        <button onClick={handleChangePassword}>Cambiar Contraseña</button>
      </div>
      <br></br>
      <div className="form-group">
        <h3>Eliminar Cuenta</h3>
        <button onClick={handleDeleteAccount} style={{ backgroundColor: 'red', color: 'white' }}>
          Eliminar mi cuenta
        </button>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Profile;
