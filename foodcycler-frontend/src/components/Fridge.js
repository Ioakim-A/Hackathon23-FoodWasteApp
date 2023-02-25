import { useState, useEffect } from "react";
import { GetUserFridgeContents } from "../utils/dbQuery";

const Fridge = ({ username }) => {
  const [fridgeItems, setFridgeItems] = useState([]);

  useEffect(() => {
    GetUserFridgeContents(username).then((items) => {
      setFridgeItems(items);
    });
  }, [username]);

  return (
    <div>
      <h1>Fridge Items for {username}</h1>
      <ul>
        {fridgeItems.map((item) => (
          <li key={item.id}>
            {item.item_name}, Qty: {item.qty}, Weight: {item.weight}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Fridge;