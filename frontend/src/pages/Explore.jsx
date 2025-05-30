import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';

export default function Explore() {
  const [filterType, setFilterType] = useState('category');
  const [filterValue, setFilterValue] = useState('');
  const [options, setOptions] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // Obtener las opciones del filtro según el tipo
  useEffect(() => {
    const fetchOptions = async () => {
      let url;
      if (filterType === 'category') url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      if (filterType === 'area') url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      if (filterType === 'ingredient') url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

      const res = await axios.get(url);
      const key = Object.keys(res.data)[0]; // "meals"
      setOptions(res.data[key]);
    };

    fetchOptions();
    setFilterValue('');
    setRecipes([]);
  }, [filterType]);

  // Buscar recetas cuando se selecciona una opción
  const handleFilter = async () => {
    let url;
    if (filterType === 'category') url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterValue}`;
    if (filterType === 'area') url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filterValue}`;
    if (filterType === 'ingredient') url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filterValue}`;

    const res = await axios.get(url);
    const key = Object.keys(res.data)[0]; // "meals"
    setRecipes(res.data[key] || []);
  };

  return (
    <div>
      <h2>Explorar recetas</h2>

      <div>
        <label>Filtrar por: </label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="category">Categoría</option>
          <option value="area">Área</option>
          <option value="ingredient">Ingrediente</option>
        </select>
      </div>

      <div>
        <label>Opción:</label>
        <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
          <option value="">Seleccionar...</option>
          {options.map((opt, idx) => {
            const key = Object.keys(opt)[0];
            return (
              <option key={idx} value={opt[key]}>
                {opt[key]}
              </option>
            );
          })}
        </select>
        <button onClick={handleFilter} disabled={!filterValue}>Buscar</button>
      </div>

      <div>
        {recipes.map((r) => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>
    </div>
  );
}
