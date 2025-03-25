import React, { useState } from "react";

function FavoriteList({ title, initialItems, onItemsChange, onDelete, onRename }) {
    const [items, setItems] = useState(initialItems);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
  
    const updateItems = (newItems) => {
      setItems(newItems);
      onItemsChange(newItems); // Sync with parent (App.jsx)
    };
  
    // Add new item
    const addItem = (newItem) => {
      updateItems([...items, newItem]);
    };
  
    // Delete an item
    const deleteItem = (indexToDelete) => {
      updateItems(items.filter((_, index) => index !== indexToDelete));
    };

    // Enable edit mode
    const startEditing = (index) => {
        setEditIndex(index);
        setEditText(items[index]);
    };
  
    // Save edited item
    const saveEdit = () => {
      const updatedItems = items.map((item, index) =>
        index === editIndex ? editText : item
      );
      updateItems(updatedItems);
      setEditIndex(null);
      setEditText("");
    };

    // Edit Title
    const saveTitleEdit = () => {
        if (newTitle.trim()) {
            onRename(newTitle);
            setIsEditingTitle(false);
        }
    };

  return (
    <div className="p-4">
    <div className="flex items-center mb-4">
    {isEditingTitle ? (
        <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && saveTitleEdit()}
        onBlur={saveTitleEdit} // Save when user clicks away
        className="border p-1 rounded"
        />
    ) : (
        <h1 className="text-2xl font-bold">{title}</h1>
    )}
    <button
        onClick={() => setIsEditingTitle(true)}
        className="ml-4 text-blue-600 hover:underline"
    >
        Edit List Name
    </button>
    </div>

      {/* Input to add new item */}
      <input
        type="text"
        placeholder="Add a new favorite..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            addItem(e.target.value.trim());
            e.target.value = "";
          }
        }}
        className="border p-2 rounded w-full mb-4"
      />

      {/* List of items */}
      <ul>
        {initialItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            {editIndex === index ? (
              // Input field while editing
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                className="border p-2 rounded w-full"
              />
            ) : (
              // Regular item view
              <span>{item}</span>
            )}

            <div>
              {editIndex === index ? (
                <button
                  onClick={saveEdit}
                  className="ml-2 text-blue-500 hover:underline"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => startEditing(index)}
                    className="ml-2 text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(index)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={onDelete}
        className="ml-4 text-red-600 hover:underline"
        >Delete List</button>
    </div>
  );
}

export default FavoriteList;
