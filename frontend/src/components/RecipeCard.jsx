import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width={200} />
      <h3>{recipe.strMeal}</h3>
      <Link to={`/receta/${recipe.idMeal}`}>Ver detalle</Link>
    </div>
  );
}
