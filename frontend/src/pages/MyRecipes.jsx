import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';

export default function MyRecipes() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  useEffect(() => {
    if (!user) return;
    fetchRecipes();
  }, [user]);

  const fetchRecipes = async () => {
    try {
      const res = await api.get('/recipes/mine');
      setRecipes(res.data);
      setError('');
    } catch (err) {
      setError('Error al cargar tus recetas');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta receta?')) return;

    try {
      await api.delete(`/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      setError('Error al eliminar la receta');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  if (!user) return <p>Debes iniciar sesión para ver tus recetas</p>;

  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div>
      <h2>Mis Recetas</h2>
      {error && <p className="error">{error}</p>}

      {recipes.length === 0 ? (
        <p>No tienes recetas creadas</p>
      ) : (
        <>
          <div className="recipe-grid">
            {currentRecipes.map((recipe) => (
              <div key={recipe._id} className="recipe-card-wrapper">
                <RecipeCard recipe={recipe} source="local" />
                <div className="card-actions">
                  <button onClick={() => handleEdit(recipe._id)}>Editar</button>
                  <button onClick={() => handleDelete(recipe._id)} className="delete-btn">
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-controls">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
