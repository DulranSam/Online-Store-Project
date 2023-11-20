import React, { useState } from "react";
import Axios from "axios";
import styles from "./register.module.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [confirm, setConfirm] = useState("");
  const [mail, setMail] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState("");

  async function Register(e) {
    e.preventDefault();
    try {
      setStatus("");
      setLoading(true);

      const response = await Axios.post("http://localhost:8000/register", {
        username: username,
        password: password,
        mail: mail,
        confirmpass: confirm,
        photo: photo,
      });

      if (response.status === 201) {
        alert("");
        setStatus("User Created");
      } else if (response.status === 409) {
        setStatus("Username or email already taken");
      } else if (response.status === 400) {
        setStatus("Error");
      } else {
        setStatus("Error!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error occurred during registration");
    } finally {
      setLoading(false);
      console.log("Execution Complete!");
    }
  }

  return (
    <div className="App">
      <form onSubmit={Register}>
        <h1>Register</h1>
        <input
          style={styles.usernameval}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          required
          placeholder="Enter Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          required
          placeholder="Enter password"
        />
        <input
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Enter Confirm Password"
          value={confirm}
          type="password"
          required
        />
        <input
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          type="email"
          required
          placeholder="Enter mail"
        />
        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          placeholder="Enter Bio"
        />
        <input
          onChange={(e) => setPhoto(e.target.files[0])}
          type="file"
          value={photo}
        />
        <p>{status}</p>
        <button type="submit">{loading ? "Loading..." : "Create User"}</button>
      </form>
    </div>
  );
}
