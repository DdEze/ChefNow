import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/external/recipe/${id}`);
        setRecipe(res.data.meals[0]);
        console.log('Receta obtenida:', res.data);
      } catch (err) {
        setError('No se pudo cargar la receta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No se encontró la receta.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ maxWidth: '400px' }} />

      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3>Instrucciones</h3>
      <p>{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div>
          <h3>Video</h3>
          <iframe
            title="Video receta"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractYoutubeId(recipe.strYoutube)}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

function extractYoutubeId(url) {
  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default RecipeDetail;
