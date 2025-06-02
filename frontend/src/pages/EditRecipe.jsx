import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        setError('No se pudo cargar la receta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/recipes/${id}`, recipe);
      navigate('/my-recipes');
    } catch (err) {
      setError('No se pudo guardar la receta');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!recipe) return null;

  return (
    <div>
      <h2>Editar Receta</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Imagen (URL)</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Categoría</label>
          <input
            type="text"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Área</label>
          <input
            type="text"
            name="area"
            value={recipe.area}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Video de YouTube</label>
          <input
            type="text"
            name="video"
            value={recipe.video}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Instrucciones</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Ingredientes</label>
          {recipe.ingredients.map((ing, idx) => (
            <div key={idx}>
              <input
                type="text"
                value={ing}
                onChange={(e) => handleIngredientChange(idx, e.target.value)}
              />
              <button type="button" onClick={() => removeIngredient(idx)}>Eliminar</button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>Agregar Ingrediente</button>
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}
