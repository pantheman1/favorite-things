import React, { useState } from "react";
import FavoriteList from "./components/FavoriteList"

function App() {
  // Store multiple lists in one state object
  const [lists, setLists] = useState({
    movies: ["Hook", "Inception"],
    books: ["Dune", "1984"],
  });

  // Track the active list (e.g., "movies", "books")
  const [activeList, setActiveList] = useState("movies");

  // Add an item to the active list
  const addItem = (newItem) => {
    setLists((prevLists) => ({
      ...prevLists,
      [activeList]: [...prevLists[activeList], newItem],
    }));
  };

  // Delete an item from the active list
  const deleteItem = (indexToDelete) => {
    setLists((prevLists) => ({
      ...prevLists,
      [activeList]: prevLists[activeList].filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  // Edit an item in the active list
  const editItem = (indexToEdit, newItem) => {
    setLists((prevLists) => ({
      ...prevLists,
      [activeList]: prevLists[activeList].map((item, index) =>
        index === indexToEdit ? newItem : item
      ),
    }));
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Favorite Things</h1>

      {/* List Selector */}
      <div className="mb-4">
        {Object.keys(lists).map((listName) => (
          <button
            key={listName}
            onClick={() => setActiveList(listName)}
            className={`mr-2 p-2 ${
              activeList === listName
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            {listName}
          </button>
        ))}
      </div>

      {/* Render FavoriteList with the active list */}
      <FavoriteList
        title={activeList}
        initialItems={lists[activeList] || []}
        addItem={addItem}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
}

export default App;
