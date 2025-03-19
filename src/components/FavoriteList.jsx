import React, {useState} from "react";

const FavoriteList = ({title, initialItems }) => {
    const [items, setItems] = useState(initialItems);

const [newItem, setNewItem] = useState("");

const handleInputChange = (e) => setNewItem(e.target.value)

    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <ul className="list-disc pl-5">
                {items.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                ))}
            </ul>
            {/* Input for new items */}
            <input
                type="text"
                value={newItem}
                onChange={handleInputChange}
                placeholder={`Add a new ${title.toLowerCase()}...`}
            />
        </div>
    )
}

export default FavoriteList