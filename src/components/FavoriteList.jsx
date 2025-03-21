import React, { useState } from "react";

function FavoriteList({ title, initialItems, addItem, deleteItem, editItem }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Enable edit mode
  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(initialItems[index]);
  };

  // Save edited item
  const saveEdit = () => {
    editItem(editIndex, editText);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

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
    </div>
  );
}

export default FavoriteList;
