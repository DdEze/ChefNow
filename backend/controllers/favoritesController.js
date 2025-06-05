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

const getFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const total = user.favorites.length;
    const favoritesPage = user.favorites.slice(skip, skip + limit);

    res.json({
      total,
      page,
      limit,
      favorites: favoritesPage,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo favoritos', error: err.message });
  }
};

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

const isRecipeFavorited = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isFavorited = user.favorites.some(fav => fav.mealId === req.params.mealId);
    res.json({ isFavorited });
  } catch (err) {
    res.status(500).json({ message: 'Error al verificar favorito' });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite, isRecipeFavorited };
