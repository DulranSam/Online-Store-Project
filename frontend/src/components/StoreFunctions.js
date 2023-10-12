import { useState , useRef } from "react";
import Axios from "axios";

export default function StoreFunctions() {
  const [data, setData] = useState({
    title: "",
    description: "",
    quantity: "",
    extra: "",
    photo: null, 
  });
  const [response, setResponse] = useState("");
  const PhotoField = useRef();

  async function addItems(e) {
    e.preventDefault();
    try {
      const Datax = new FormData();
      Datax.append("title", data.title);
      Datax.append("description", data.description);
      Datax.append("quantity", data.quantity);
      Datax.append("extra", data.extra);
    for (let i =  0 ; i < data.photo.length ; i++){
        Datax.append("photo", data.photo);
    }
      

      const r = await Axios.post("http://localhost:8000/additem", Datax,{headers:{"Content-Type":"multipart/form-data"}});
      if (r.status === 201) {
        setResponse("Item Added");
      } else if (r.status === 409 || r.status === 400) {
        setResponse("Required Fields not filled");
      } else {
        setResponse("Internal Server Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
        <h1>Store Items</h1>
      <form onSubmit={addItems}>
        <input
          onChange={(e) => {
            setData({ ...data, title: e.target.value });
          }}
          required={true}
          type="text"
          placeholder="Enter title"
        />
        <input
          onChange={(e) => {
            setData({ ...data, description: e.target.value });
          }}
          required={true}
          type="text"
          placeholder="Enter description"
        />
        <input
          onChange={(e) => {
            setData({ ...data, quantity: e.target.value });
          }}
          type="number"
          required={true}
          placeholder="Enter quantity"
        />
        <input
          onChange={(e) => {
            setData({ ...data, extra: e.target.value });
          }}
          type="text"
          placeholder="Enter extra"
        />
        <input
          onChange={(e) => {
            setData({ ...data, photo: e.target.files[0] });
          }}
          ref={PhotoField}
          type="file"
        />
        <button type="submit" style={{ width: "10vw", height: "10vh" }}>
          Add Item
        </button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}
