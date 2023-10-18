import React, { useState } from "react";

export default function UI() {
  const [data, setData] = useState(["item 1", "item 2"]);
  const [cart, setCart] = useState(""); 

  function addtocart() {
    const newItem = `Item ${data.length+1} Added`; 
    setCart([...cart, newItem]); 
  }





  return (
    <div className="container">
      <p>Your cart contains {cart.join(" , ")}</p>
      <button onClick={addtocart}>Add to cart</button>
    </div>
  );
}
