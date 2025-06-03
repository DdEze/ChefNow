import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { api } from '../services/api';

const fetchRecipeDetails = async (mealId, source) => {
  if (source === 'external') {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await res.json();
      return data.meals[0];
    } catch (err) {
      return null;
    }
  } else {
    try {
      const res = await api.get(`/recipes/${mealId}`);
      return res.data;
    } catch (err) {
      return null;
    }
  }
};

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/favorites?page=${page}&limit=${limit}`);
      const favoriteEntries = res.data.favorites;

      const detailedFavorites = await Promise.all(
        favoriteEntries.map(async (fav) => {
          const details = await fetchRecipeDetails(fav.mealId, fav.source);
          if (!details) return null;

          const isExternal = fav.source === 'external';
          return {
            ...details,
            idMeal: isExternal ? details.idMeal : details._id,         
            strMeal: isExternal ? details.strMeal : details.title,     
            strMealThumb: isExternal ? details.strMealThumb : details.image, 
            isFavorited: true,
            source: isExternal ? 'api' : 'local'
          };
        })
      );


      setFavorites(detailedFavorites.filter(r => r !== null));
      setTotal(res.data.total);
      setError(null);
    } catch (err) {
      setError('Error cargando favoritos');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFavorites();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Recetas Favoritas</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      <div className="recipe-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {favorites.length === 0 && !loading && <p>No tienes recetas favoritas.</p>}
        {favorites.map(recipe => (
          <RecipeCard key={recipe.idMeal || recipe._id} recipe={recipe} />
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</button>
        <span style={{ margin: '0 1rem' }}>Página {page} de {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Siguiente</button>
      </div>
    </div>
  );
};

export default FavoriteRecipes;
