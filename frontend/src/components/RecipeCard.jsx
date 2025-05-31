import FavoriteButton from './FavoriteButton';

const RecipeCard = ({ recipe, onFavoriteChange }) => {
  const [favorited, setFavorited] = useState(recipe.isFavorited || false);

  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      <FavoriteButton 
        recipeId={recipe._id} 
        isFavorited={favorited}
        onToggle={setFavorited}
      />
    </div>
  );
};

export default RecipeCard;