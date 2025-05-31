import { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/recipes';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [area, setArea] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [areas, setAreas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const recipesPerPage = 8;
  const startIndex = (page - 1) * recipesPerPage;
  const paginatedRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  // Fetch listas
  const fetchAreas = async () => {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const areaList = res.data.meals.map(a => a.strArea);
      setAreas(areaList);
    } catch (error) {
      console.error('Error al obtener áreas:', error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const categoryList = res.data.meals.map(c => c.strCategory);
      setCategories(categoryList);
    } catch (error) {
      console.error('Error al obtener categorías:', error.message);
    }
  };

  const fetchIngredients = async () => {
    try {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredientList = res.data.meals.map(i => i.strIngredient);
      setIngredients(ingredientList);
    } catch (error) {
      console.error('Error al obtener ingredientes:', error.message);
    }
  };

  const fetchRecipesHandler = async () => {
    setLoading(true);
    try {
      const res = await fetchRecipes({ q: query, category, area, ingredient });
      setRecipes(res.data.meals || []);
      setPage(1);
    } catch (err) {
      console.error('Error al buscar recetas', err);
      setRecipes([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipesHandler();
  };

  useEffect(() => {
    fetchAreas();
    fetchCategories();
    fetchIngredients();
  }, []);

  return (
    <div className="home">
      <h2>Buscar Recetas</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Select categoría */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Categoría --</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Select área */}
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">-- Área / país --</option>
          {areas.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        {/* Select ingrediente */}
        <select value={ingredient} onChange={(e) => setIngredient(e.target.value)}>
          <option value="">-- Ingrediente --</option>
          {ingredients.map(i => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>

        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando recetas...</p>}

      <div className="recipe-list">
        {paginatedRecipes.length === 0 && !loading && <p>No se encontraron recetas</p>}
        {paginatedRecipes.map((r) => (
          <div key={r.idMeal} className="recipe-card">
            <img src={r.strMealThumb} alt={r.strMeal} style={{ width: '100px' }} />
            <h4>{r.strMeal}</h4>
            <Link to={`/receta/${r.idMeal}`}>Ver detalles</Link>
          </div>
        ))}
      </div>

      {recipes.length > recipesPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
