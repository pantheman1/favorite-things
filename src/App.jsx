import React, { useState } from "react";
import FavoriteList from "./components/FavoriteList";
import sampleFavorites from "./data/sampleData";

function App() {
  const [lists, setLists] = useState(sampleFavorites)

  // Add a new list
  const addList = (title) => {
    const newList = { id: Date.now(), title, items: [] };
    setLists([...lists, newList]);
  };

  // Update items for a specific list
  const updateListItems = (listId, newItems) => {
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, items: newItems } : list
      )
    );
  };

  return (
    <div>
      <h1>Favorite Things</h1>

      {/* Input to create a new list */}
      <input
        type="text"
        placeholder="Add new list..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            addList(e.target.value.trim());
            e.target.value = "";
          }
        }}
      />

      {/* Render multiple FavoriteList components */}
      {lists.map((list) => (
        <FavoriteList
          key={list.id}
          title={list.title}
          initialItems={list.items}
          onItemsChange={(newItems) => updateListItems(list.id, newItems)}
        />
      ))}
    </div>
  );
}

export default App;