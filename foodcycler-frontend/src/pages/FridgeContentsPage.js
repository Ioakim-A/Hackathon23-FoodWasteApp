import { GetUserFridgeContents } from "../utils/dbQuery/GetUserFridgeContents";
import getUserNameFromSessionID from "../utils/getUserNameFromSessionID";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { useState, useEffect } from "react";
import beef from "../assets/Beef Mince.png";
import chicken from "../assets/Chicken Breast.png";
import apple from "../assets/apple.png";
import orange from "../assets/orange.png";
import milk from "../assets/milk.png";
import steak from "../assets/steak.png";
import fridgeBackground from "../assets/fridge_background.png";


import "./css/FridgeContentsPage.css"

const FridgeContentsPage = () => {
  const sessionID = localStorage.getItem("sessionID");
  const [fridgeContents, setFridgeContents] = useState([]);

  const styles = {
    fridgeBackground: {
      backgroundImage: `url(${fridgeBackground})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      padding: "20px",
    },
  };
  

  const fridgeItems = {
    "Beef Mince": beef,
    "Chicken Breast": chicken,
    "apple": apple,
    "orange": orange,
    "milk": milk,
<<<<<<< Updated upstream
    "steak": steak,
=======
    "Steak": steak,
>>>>>>> Stashed changes
  };

  useEffect(() => {
    if (sessionID) {
      GetUserFridgeContents(getUserNameFromSessionID(sessionID)).then(
        (result) => setFridgeContents(result)
      );
    }
  }, [sessionID]);

  if (!sessionID) {
    return (
      <div>
        <h1>You must be logged in to perform this action.</h1>
      </div>
    );
  }

  const displayFridgeItems = () => {
    const items = [];
    let row = [];
<<<<<<< Updated upstream
    let itemCount =0;
=======
>>>>>>> Stashed changes

    fridgeContents.forEach((item) => {
      const img = (
        <img
          src={fridgeItems[item.item_name]}
          alt={item.item_name}
<<<<<<< Updated upstream
          style={{ width: "200px", height: "200px" }}
=======
          style={{ width: "250px", height: "250px" }}
>>>>>>> Stashed changes
        />
      );
      const name = <h3>{capitalizeFirstLetter(item.item_name)}</h3>;
      const qty = (
        <div>
          <label>Quantity:</label>
<<<<<<< Updated upstream
          <input type="number" value={item.item_qty} className="inputLine"/>
        </div>
      );
      const weight = (
        <div style={{marginRight:"6px"}}>
          <label>Weight(g):</label>
          <input type="number" value={item.item_weight} className="inputLine"/>
=======
          <input type="number" value={item.item_qty} />
        </div>
      );
      const weight = (
        <div>
          <label>Weight:</label>
          <input type="number" value={item.item_weight} />
>>>>>>> Stashed changes
        </div>
      );

      row.push(
<<<<<<< Updated upstream
          <div key={item.item_name} style={{ display: "inline-block", marginLeft: "25px", marginTop: "25px", backgroundColor: "rgb(0,0,0,0.1)", paddingBottom:"20px",paddingLeft:"20px",paddingRight:"20px", textAlign: "center" }}>
            {img}
            {name}
            {qty}
            {weight}
          </div>
      );

      itemCount++;

    if (itemCount % 5 === 0) {
      items.push(<div key={items.length}>{row}</div>);
      row = [];
    }
  });

  if (row.length > 0) {
    items.push(<div key={items.length}>{row}</div>);
  }

  return items;
};

return (
  <div style={styles.fridgeBackground}>
    <h1 className="title">Fridge Contents</h1>
    <div>{displayFridgeItems()}</div>
  </div>
);
=======
        <div key={item.item_name} style={{ display: "inline-block", marginLeft: "25px", backgroundColor: "rgb(0,0,0,0.1)", paddingBottom:"20px",paddingLeft:"20px",paddingRight:"20px" }}>
          {img}
          {name}
          {qty}
          {weight}
        </div>
      );

      if (row.length === 3) {
        items.push(<div key={items.length}>{row}</div>);
        row = [];
      }
    });

    if (row.length > 0) {
      items.push(<div key={items.length}>{row}</div>);
    }

    return items;
  };

  return (
    <div style={styles.fridgeBackground}>
      <h1 className="title">Fridge Contents</h1>
      {displayFridgeItems()}
    </div>
  );
>>>>>>> Stashed changes
};

export default FridgeContentsPage;
