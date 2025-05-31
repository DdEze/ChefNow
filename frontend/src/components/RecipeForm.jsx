import { useState, useContext } from 'react';
import { recipelAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';


export default function RecipeForm() {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [video, setVideo] = useState('');
  const [imageFile, setImageFile] = useState(null);
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

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('area', area);
    ingredients.forEach((ing, i) => formData.append(`ingredients[${i}]`, ing));
    formData.append('instructions', instructions);
    formData.append('video', video);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await recipelAPI.post('/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Receta creada con éxito');
      setTitle('');
      setCategory('');
      setArea('');
      setIngredients(['']);
      setInstructions('');
      setVideo('');
      setImageFile(null);
    } catch (err) {
      setMessage('Error creando la receta');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Crear Receta</h2>
      {message && <p>{message}</p>}

      <label>Título</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Categoría</label>
      <input value={category} onChange={e => setCategory(e.target.value)} />

      <label>Área</label>
      <input value={area} onChange={e => setArea(e.target.value)} />

      <label>Ingredientes</label>
      {ingredients.map((ing, i) => (
        <div key={i}>
          <input
            value={ing}
            onChange={e => handleIngredientChange(i, e.target.value)}
            required
          />
          {ingredients.length > 1 && (
            <button type="button" onClick={() => removeIngredient(i)}>Quitar</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addIngredient}>Agregar ingrediente</button>

      <label>Instrucciones</label>
      <textarea
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
        required
      />

      <label>Video (URL)</label>
      <input value={video} onChange={e => setVideo(e.target.value)} />

      <label>Imagen</label>
      <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />

      <button type="submit">Crear</button>
    </form>
  );
}
