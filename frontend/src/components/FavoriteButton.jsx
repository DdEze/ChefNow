import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const FavoriteButton = ({ recipeId, onToggle }) => {
  const [favorited, setFavorited] = useState(false);

  // Consultar si la receta está en favoritos al montar
  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const res = await api.get(`/favorites/${recipeId}`);
        setFavorited(res.data.isFavorited);
      } catch (err) {
        console.error('Error al verificar favorito:', err);
      }
    };

    checkIfFavorited();
  }, [recipeId]);

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
