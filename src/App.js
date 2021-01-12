import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App = () =>{

  const APP_ID = "9b117ea1";
  const APP_KEY = "27e24c1c3d745b25c99f2a53a1d1a406";

  const [query, setQuery] = useState("")
  const request =`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(request);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

const updateSearch = e => {
  setSearch(e.target.value); 
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

  return(
    <div className="App">
       <h1 className="heading">RECIPE APP</h1>
     
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
        key={recipe.recipe.label}  
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
        
      ))}
      </div>
    </div>
  );
};



export default App;
