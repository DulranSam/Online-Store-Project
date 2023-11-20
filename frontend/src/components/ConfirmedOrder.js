export default function Confirmedorder() {
  const totalBill = parseFloat(localStorage.getItem("totalbill")) || 0;
  const itemsBought = parseInt(localStorage.getItem("itemsbought"), 10) || 0;

  return (
    <div className="container">
      <h1>Your total is ${totalBill}</h1>
      <p>The items you bought are: {itemsBought}</p>
    </div>
  );
}
