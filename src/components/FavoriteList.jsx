import React, {useState} from "react";

const FavoriteList = ({title, initialItems }) => {
    const [items, setItems] = useState(initialItems);

    const [newItem, setNewItem] = useState("");

    const handleInputChange = (e) => setNewItem(e.target.value)

    const handleAddItem = (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        if (!newItem.trim()) return; //Ignore empty input

        // Update the items list
        setItems([...items, newItem]);

        // Clear the input
        setNewItem("");
    };

    // Function to delete an item by index
    const handleDeleteItem = (indexToDelete) => {
        const updatedItems = items.filter((_, index) => index !== indexToDelete);
        setItems(updatedItems);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <ul className="list-disc pl-5">
                {items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                        {item}
                        <button onClick={() => handleDeleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* Input for new items */}
            <form onSubmit={handleAddItem}>
                <input
                    type="text"
                    value={newItem}
                    onChange={handleInputChange}
                    placeholder={`Add a new ${title.toLowerCase()}...`}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default FavoriteList