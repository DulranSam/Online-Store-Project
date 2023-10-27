import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    bio: "",
    photo: null, 
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function Register(e) {
    e.preventDefault();
    if (response.length !== 0) {
      setResponse("");
    }
    try {
      setLoading(true);
      const datax = new FormData();
      datax.append("username", data.username);
      datax.append("password", data.password);
      datax.append("mail", data.mail);
      datax.append("bio", data.bio);
      if (data.photo) {
        datax.append("photo", data.photo);
      }

      const r = await Axios.post("http://localhost:8000/register", datax, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (r.status === 201) {
        setResponse("User created");
      } else if (r.status === 409) {
        setResponse("User already exists");
      } else if (r.status === 400) {
        setResponse("Required credentials not filled");
      } else {
        setResponse("Internal Server Error");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <form onSubmit={Register}>
        <h1>Register</h1>
        <input
          onChange={(e) => setData((prevData) => ({ ...prevData, username: e.target.value }))}
          value={data.username}
          type="text"
          required
          placeholder="Enter Username"
        />
        <input
          onChange={(e) => setData((prevData) => ({ ...prevData, password: e.target.value }))}
          value={data.password}
          type="password"
          required
          placeholder="Enter password"
        />
        <input
          onChange={(e) => setData((prevData) => ({ ...prevData, mail: e.target.value }))}
          value={data.mail}
          type="email"
          required
          placeholder="Enter mail"
        />
        <input
          onChange={(e) => setData((prevData) => ({ ...prevData, bio: e.target.value }))}
          value={data.bio}
          placeholder="Enter Bio"
          required
        />
        <input
          onChange={(e) => setData((prevData) => ({ ...prevData, photo: e.target.files[0] }))}
          type="file"
        />
        <p>{response}</p>
        <button
          type="submit"
          style={{ width: "10vw", height: "10vh" }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
