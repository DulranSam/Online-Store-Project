import React, { useState } from "react";

export default function Hoodies() {
  const [hoodieQuantity, setHoodieQuantity] = useState(1);
  const [tshirtQuantity, setTshirtQuantity] = useState(1);
  const [caseQuantity, setCaseQuantity] = useState(1);
  const [pricing, setPricing] = useState(0);

  function addToCart(price, quantity, setQuantity) {
    setPricing((prevPrice) => prevPrice + price * quantity);
    setQuantity(quantity);
  }

  function PlaceOrder() {
    console.log(`The final price is $${pricing}`);
    alert(`Order placed. Your total is $${pricing}`);
    localStorage.setItem("totalbill", pricing);
    // window.location.href = "http://localhost:3000/confirmedorder";
  }

  function CancelOrder() {
    alert("Order cancelled");
    window.location.href = "http://localhost:3000/";
  }

  return (
    <div className="container">
      <section className="hoodies">
        <h1>Hoodies</h1>
        <button
          onClick={() => addToCart(50, hoodieQuantity, setHoodieQuantity)}
          className="addhoodie"
        >
          $50
        </button>
        <input
          type="number"
          className="quantityVal"
          value={hoodieQuantity}
          onChange={(e) => setHoodieQuantity(parseInt(e.target.value, 10))}
        />
      </section>

      <section className="Tshirts">
        <h1>Tshirt</h1>
        <button
          onClick={() => addToCart(70, tshirtQuantity, setTshirtQuantity)}
          className="addtshirt"
        >
          $70
        </button>
        <input
          type="number"
          className="quantityVal"
          value={tshirtQuantity}
          onChange={(e) => setTshirtQuantity(parseInt(e.target.value, 10))}
        />
      </section>

      <section className="cases">
        <h1>Case</h1>
        <button
          onClick={() => addToCart(20, caseQuantity, setCaseQuantity)}
          className="addcase"
        >
          $20
        </button>
        <input
          type="number"
          className="quantityVal"
          value={caseQuantity}
          onChange={(e) => setCaseQuantity(parseInt(e.target.value, 10))}
        />
      </section>

      <p>Total Price: ${pricing}</p>
      <button onClick={PlaceOrder}>Place Order</button>
      <button onClick={CancelOrder}>Cancel Order</button>
    </div>
  );
}
