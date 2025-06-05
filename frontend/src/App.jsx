import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetail from './pages/RecipeDetails';
import RecipeForm from './components/RecipeForm';
import MyRecipes from './pages/MyRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import EditRecipe from './pages/EditRecipe';
import Profile from './pages/Profile';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/receta/:source/:id" element={<RecipeDetail />} />
        <Route path="/create" element={user ? <RecipeForm /> : <Navigate to="/iniciar-sesion" />} />
        <Route path="/my-recipes" element={user ? <MyRecipes /> : <Navigate to="/iniciar-sesion" />} />
        <Route path="/editar-receta/:id" element={user ? <EditRecipe/> : <Navigate to="/iniciar-sesion" />} />
        <Route path="/favoritos" element={user ? <FavoriteRecipes /> : <Navigate to="/iniciar-sesion" />} />
        <Route path="/perfil" element={user ? <Profile/> : <Navigate to="/iniciar-sesion" />} />
      </Routes>
    </div>
  );
}

export default App;
