import { useEffect, useState } from 'react';
import { getFavorites } from '../services/recipeService';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getFavorites()
      .then(data => setRecipes(data))
      .catch(err => console.error('Error cargando favoritos', err));
  }, []);

  return (
    <div>
      <h2>Mis Recetas Favoritas</h2>
      {recipes.length === 0 ? (
        <p>No tienes recetas favoritas aún.</p>
      ) : (
        recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))
      )}
    </div>
  );
};

export default Favorites;
