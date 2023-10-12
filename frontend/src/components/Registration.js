import { useState } from "react";
import Axios from "axios";
import "./Registration.css";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function Register(e) {
    e.preventDefault();
    if (setResponse.length !== 0) {
      setResponse("");
    }
    try {
      setLoading(true);
      const datax = new FormData();
      datax.append("username", data.username);
      datax.append("password", data.password);
      datax.append("mail", data.mail);

      datax.append("photo", data.photo);

      const r = await Axios.post("http://localhost:8000/register", datax);
      if (r.status === 400) {
        setResponse("Required credentials not filled");
      } else if (r.status === 409) {
        setResponse("User already exists");
      } else if (r.status === 201) {
        setResponse("User created");
      } else {
        setResponse("Internal Server Error");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <form onSubmit={Register}>
        <h1>Register</h1>
        <input
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
          value={data.username}
          type="text"
          placeholder="Enter Username"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          value={data.password}
          type="password"
          placeholder="Enter password"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, mail: e.target.value });
          }}
          value={data.mail}
          type="email"
          placeholder="Enter mail"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, photo: e.target.files[0] });
          }}
          type="file"
          placeholder="Enter photo"
        ></input>
        <p>{response}</p>
        <button
          type="submit"
          style={{ width: "10vw", height: "10vh" }}
          disable={loading === true ? true : false}
        >
          Create User
        </button>
      </form>
    </div>
  );
}
