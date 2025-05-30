const User = require('../models/User');

const addFavorite = async (req, res) => {
  const { mealId, source } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const alreadyFavorited = user.favorites.find(fav => fav.mealId === mealId);
    if (alreadyFavorited) return res.status(400).json({ message: 'Ya está en favoritos' });

    user.favorites.push({ mealId, source });
    await user.save();

    res.status(200).json({ message: 'Agregado a favoritos' });
  } catch (err) {
    res.status(500).json({ message: 'Error agregando favorito', error: err.message });
  }
};

// Obtener todos los favoritos
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo favoritos', error: err.message });
  }
};

// Eliminar favorito
const removeFavorite = async (req, res) => {
  const { mealId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.favorites = user.favorites.filter(fav => fav.mealId !== mealId);
    await user.save();

    res.json({ message: 'Favorito eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando favorito', error: err.message });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };
