import { useState } from "react";
import Axios from "axios";

export default function Home() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  async function getItems(e) {
    e.preventDefault();
    try {
      const response = await Axios.get("http://localhost:8000/verify");
      setItems(response.data);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={getItems}>
        <p>{JSON.stringify(items)}</p>
        {error && <p>Error: {error.message}</p>}
        <button type="submit">Get Items</button>
      </form>
    </div>
  );
}
