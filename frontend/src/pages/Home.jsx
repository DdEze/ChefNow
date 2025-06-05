import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/recipes';
import RecipeCard from '../components/RecipeCard';

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

  const fetchFilters = async (url, setter, mapper) => {
    try {
      const res = await axios.get(url);
      if (res.data?.meals) {
        setter(res.data.meals.map(mapper));
      }
    } catch (error) {
      console.error(`Error al obtener datos desde ${url}:`, error.message);
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
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipesHandler();
  };

  useEffect(() => {
    fetchFilters('https://www.themealdb.com/api/json/v1/1/list.php?a=list', setAreas, a => a.strArea);
    fetchFilters('https://www.themealdb.com/api/json/v1/1/list.php?c=list', setCategories, c => c.strCategory);
    fetchFilters('https://www.themealdb.com/api/json/v1/1/list.php?i=list', setIngredients, i => i.strIngredient);
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

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Categoría --</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">-- Área / país --</option>
          {areas.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

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
        {!loading && paginatedRecipes.length === 0 && <p>No se encontraron recetas</p>}
        {paginatedRecipes.map((r) => (
          <RecipeCard
            key={r.idMeal}
            recipe={{
              _id: r.idMeal,
              title: r.strMeal,
              image: r.strMealThumb,
              source: 'api',
              isFavorited: false,
            }}
          />
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
