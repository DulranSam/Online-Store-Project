import React, { useState } from "react";
import Axios from "axios";
//import "./register.css";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await Axios.post(
        "http://localhost:8000/register/login",
        { username: username, password: password }
      );

      if (response.status === 200) {
        alert(`Welcome back ${username}`);
        setResponse("Authorized");
      } else if (response.status === 401) {
        alert(`${username} Unauthorized`);
        setResponse("Unauthorized");
      } else if (response.status === 400) {
        setResponse("Username and password missing");
      } else {
        setResponse("Server Error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
                setUsername(e.target.value);
              }}
              required
              value={username}
              className="usernameval"
            />
            <p>Password : </p>
            <input
              type="password"
              placeholder="Enter Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className="passwordval"
            />
            <br />
            <p>{response}</p>
            <button type="submit" style={{ width: "10vw", height: "10vh" }}>
              {loading ? "Loading..." : "Login"}
            </button>
            <br />
            <h1>
              Don't have an account? Click <a href="/register">Here</a> to
              Register
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}
