import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const RecipeDetail = () => {
  let { id, source } = useParams();
  if (!source) source = 'local';

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log(source)
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
  const ingredients = isExternal
    ? Array.from({ length: 20 }, (_, i) => {
        const ingredient = recipe[`strIngredient${i + 1}`];
        const measure = recipe[`strMeasure${i + 1}`];
        return ingredient ? `${measure} ${ingredient}` : null;
      }).filter(Boolean)
    : recipe.ingredients;

  return (
    <div>
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
      <h3>Instrucciones</h3>
      <p>{instructions}</p>
    </div>
  );
};

export default RecipeDetail;
