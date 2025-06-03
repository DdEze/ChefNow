import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

function extractYoutubeID(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const RecipeDetail = () => {
  let { id, source } = useParams();
  if (!source) source = 'local';

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (source === 'api') {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await response.json();
          setRecipe(data.meals ? data.meals[0] : null);
          if (!data.meals) setError('Receta no encontrada en API externa');
        } else if (source === 'local') {
          const res = await api.get(`/recipes/${id}`);
          setRecipe(res.data);
        } else {
          setError('Fuente desconocida');
        }
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la receta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, source]);

  if (loading) return <p>Cargando receta...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>No se encontró la receta</p>;

  const isExternal = source === 'api';

  const title = isExternal ? recipe.strMeal : recipe.title;
  const image = isExternal ? recipe.strMealThumb : recipe.image;
  const instructions = isExternal ? recipe.strInstructions : recipe.instructions;
  const area = isExternal ? recipe.strArea : recipe.area;
  const category = isExternal ? recipe.strCategory : recipe.category;
  const videoUrl = isExternal ? recipe.strYoutube : recipe.video;
  const ingredients = isExternal
    ? Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[`strIngredient${i + 1}`];
        const measure = recipe[`strMeasure${i + 1}`];
        return ingredient ? `${measure} ${ingredient}` : null;
      }).filter(Boolean)
    : recipe.ingredients;

  return (
    <div className="recipe-detail">
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <p><strong>Área:</strong> {area}</p>
      <p><strong>Categoría:</strong> {category}</p>
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Instrucciones</h3>
      <p>{instructions}</p>

      {isExternal && videoUrl && (
        <div className="video-container">
          <h3>Video de la receta</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractYoutubeID(videoUrl)}`}
            title="Video receta"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {!isExternal && videoUrl && (
        <div className="video-container">
          <h3>Video de la receta</h3>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">{videoUrl}</a>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
