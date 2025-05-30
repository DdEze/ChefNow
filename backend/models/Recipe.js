const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String },
  area:        { type: String },
  ingredients: { type: [String], required: true },
  instructions:{ type: String, required: true },
  image:       { type: String, default: '' },
  video:       { type: String },
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
