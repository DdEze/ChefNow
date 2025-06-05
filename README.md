# ChefNow

![React Version](https://img.shields.io/badge/react-18.2.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-4.4-green)
![Node.js](https://img.shields.io/badge/node-%3E=16.0.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.18.2-black?logo=express&logoColor=white)
[![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML](https://img.shields.io/badge/html5-HTML-orange?logo=html5&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/css3-CSS-blue?logo=css3&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Descripción

**ChefNow** es una aplicación web que permite a los usuarios explorar recetas de cocina, crear sus propias recetas y ver detalles de cada una, tanto desde una base de datos, como desde la API pública de [TheMealDB](https://www.themealdb.com/).

---

## Funcionalidades

- **Buscar recetas** por nombre, area o categoría (API externa: [TheMealDB](https://www.themealdb.com/api.php))
- **Crear recetas propias** (título, categoría, ingredientes, instrucciones, video, imagen, etc.).
- **Soporte para videos** de preparación (YouTube).
- **Visualización detallada** de cada receta.
- **Poner como favorito** una receta.
- **Autenticación de usuarios**.
- **Soporte para imágenes por URL**.

---

## Tecnologías utilizadas

- **Frontend:** React, React Router DOM, Fetch API, CSS, HTML.
- **Backend:** Node.js + Express.
- **Persistencia:** MongoDB.

---

## API externa

Se utiliza TheMealDB para obtener recetas del mundo real.

Algunos endpoints utilizados:

- https://www.themealdb.com/api/json/v1/1/search.php?s={query}

- https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

- https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}

---

## Instalación

### Requisitos previos

- Node.js y npm
- MongoDB
- git clone https://github.com/tu-usuario/chefnow.git

### 1. Frontend

```bash
cd chefnow/frontend
npm install
npm run dev
```

### 2. Backend

```bash
cd chefnow/backend
npm install  
npm run dev  
```

## Estructura del proyecto

```
chefnow/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── externalRecipesController.js
│   │   ├── favoritesController.js
│   │   ├── recipesController.js
│   │   └── usersController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── models/
│   │   ├── recipe.js
│   │   └── user.js
│   ├── routes/
│   │   ├── externalRecipe.js
│   │   ├── favorite.js
│   │   ├── recipe.js
│   │   └── user.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FavoriteButton.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   └── RecipeForm.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── EditRecipe.jsx
│   │   │   ├── FavoriteRecipes.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyRecipes.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   ├── recipes.js
│   │   │   └── recipeService.js
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.css
├── README.md
└── .gitignore
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.