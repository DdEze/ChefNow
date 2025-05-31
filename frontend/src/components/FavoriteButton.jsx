import { useState } from 'react';
import { toggleFavorite } from '../services/recipeService';

const FavoriteButton = ({ recipeId, isFavorited, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const updated = await toggleFavorite(recipeId);
      onToggle(updated.favorited);
    } catch (err) {
      console.error('Error al actualizar favorito', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {isFavorited ? '❤️ Quitar' : '🤍 Favorito'}
    </button>
  );
};

export default FavoriteButton;
