import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const FavoriteButton = ({ recipeId, isFavorited = false, onToggle }) => {
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    setFavorited(isFavorited); 
  }, [isFavorited]);

  const toggleFavorite = async () => {
    try {
      if (favorited) {
        await api.delete(`/favorites/${recipeId}`);
        setFavorited(false);
        onToggle && onToggle(false);
      } else {
        await api.post('/favorites', { mealId: recipeId, source: recipeId.length === 24 ? 'custom' : 'external' });
        setFavorited(true);
        onToggle && onToggle(true);
      }
    } catch (err) {
      console.error('Error al cambiar favorito:', err);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {favorited ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;
