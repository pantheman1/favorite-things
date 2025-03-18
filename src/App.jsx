import React from "react";
import FavoriteList from "./components/FavoriteList";
import sampleFavorites from "./data/sampleData";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Favorite Things Tracker</h1>
      <FavoriteList title="Movies" initialItems={sampleFavorites.movies}></FavoriteList>
      <FavoriteList title="Books" initialItems={sampleFavorites.books}></FavoriteList>
      <FavoriteList title="Foods" initialItems={sampleFavorites.foods}></FavoriteList>
    </div>
  );
}
export default App;
