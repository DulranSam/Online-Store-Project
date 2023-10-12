import { useState } from "react";
import Axios from "axios";

export default function GetData() {
  const [data, setData] = useState([]);

  async function GetDatax(e) {
    e.preventDefault();
    try {
      const r = await Axios.get("http://localhost:8000/register");
      setData(r.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={GetDatax}>
      <p>{JSON.stringify(data)}</p>
      <button>find out</button>
      </form>

    </div>
  );
}
