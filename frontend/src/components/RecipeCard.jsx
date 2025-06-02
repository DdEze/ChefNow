import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useAuth } from '../context/AuthContext';

const RecipeCard = ({ recipe }) => {

  const { user } = useAuth();
  const [favorited, setFavorited] = useState(recipe.isFavorited || false);
  const isExternal = !!recipe.idMeal;
  const title = isExternal ? recipe.strMeal : recipe.title;
  const image = isExternal ? recipe.strMealThumb : recipe.image;
  const id = isExternal ? recipe.idMeal : recipe._id;
  const source = recipe.source || (isExternal ? 'api' : 'local');
  const detailPath = `/receta/${source}/${id}`;


  return (
    <div className="recipe-card">
      <h3>{title}</h3>
      {user && (
        <FavoriteButton
          recipeId={id}
          isFavorited={favorited}
          onToggle={setFavorited}
        />
      )}
      <img src={image} alt={title} />
      <Link to={detailPath}>Ver detalles</Link>
    </div>
  );
};

export default RecipeCard;
