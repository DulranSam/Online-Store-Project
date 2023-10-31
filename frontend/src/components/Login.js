import React, { useState } from "react";
import Axios from "axios";

export default function Login(props) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await Axios.post("http://localhost:8000/register/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert(`Welcome back ${data.username}`);
        setResponse("Authorized");
      } else if (response.status === 401) {
        alert(`${data.username} Unauthorized`);
        setResponse("Unauthorized");
      } else if (response.status === 400) {
        setResponse("Username and password missing");
      } else {
        setResponse("Server Error");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="fields">
            <p>Username : </p>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              required
              value={data.username}
              className="usernameval"
            />
            <p>Password : </p>
            <input
              type="password"
              placeholder="Enter Password"
              required
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              value={data.password}
              className="passwordval"
            />
            <br />
            <p>{response}</p>
            <button type="submit" style={{ width: "10vw", height: "10vh" }}>
              {loading ? "Loading..." : "Login"}
            </button>
            <br />
            <h1>
              Don't have an account? Click <a href="/register">Here</a> to Register
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}
