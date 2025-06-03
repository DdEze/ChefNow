import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function RecipeForm() {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [video, setVideo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Debes iniciar sesión para crear una receta');
      return;
    }

    const payload = {
      title,
      category,
      area,
      ingredients,
      instructions,
      video,
      image: imageUrl,
    };

    try {
      await api.post('/recipes', payload);
      setMessage('Receta creada con éxito');
      setTitle('');
      setCategory('');
      setArea('');
      setIngredients(['']);
      setInstructions('');
      setVideo('');
      setImageUrl('');
    } catch (err) {
      console.error(err);
      setMessage('Error creando la receta');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Crear Receta</h2>
        {message && (
          <p className={message.includes('éxito') ? 'form-success' : 'form-error'}>
            {message}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Área</label>
          <input value={area} onChange={e => setArea(e.target.value)} />
        </div>

        <fieldset className="form-group">
          <legend>Ingredientes</legend>
          {ingredients.map((ing, i) => (
            <div key={i} className="form-group-inline">
              <input
                value={ing}
                onChange={e => handleIngredientChange(i, e.target.value)}
                required
              />
              {ingredients.length > 1 && (
                <button type="button" className="btn-remove" onClick={() => removeIngredient(i)}>Quitar</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredient}>Agregar ingrediente</button>
        </fieldset>
        
        <div className="form-group">
          <label>Instrucciones</label>
          <textarea
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Video (URL)</label>
          <input value={video} onChange={e => setVideo(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Imagen (URL)</label>
          <input
            type="url"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/imagen.jpg"
          />
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
