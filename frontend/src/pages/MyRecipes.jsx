import { useState, useEffect, useContext } from 'react';
import { recipelAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';


export default function MyRecipes() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchRecipes = async () => {
      try {
        const res = await recipelAPI.get('/recipes/mine');
        setRecipes(res.data);
      } catch (err) {
        setError('Error al cargar tus recetas');
      }
    };
    fetchRecipes();
  }, [user]);

  if (!user) return <p>Debes iniciar sesión para ver tus recetas</p>;

  return (
    <div>
      <h2>Mis Recetas</h2>
      {error && <p>{error}</p>}
      {recipes.length === 0 ? (
        <p>No tienes recetas creadas</p>
      ) : (
        <ul>
          {recipes.map(r => (
            <li key={r._id}>{r.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
