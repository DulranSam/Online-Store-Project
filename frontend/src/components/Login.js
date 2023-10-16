import React, { useState} from "react";
import Axios from "axios";
import "./Login.css";

export default function Login() {
  const[data,setData] = useState({
    username:"",
    password:""
  });
  const [response, setResponse] = useState("");



  async function handleLogin(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);

      const response = await Axios.post(
        "http://localhost:8000/register/login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ).then((response)=>{
        if(response.status===200){
          setResponse("Authorized")
        }else if(response.status===401){
          setResponse("Unauthorized")
        }else if (response.status===400){
          setResponse("Username and password missing");
        }else{
          setResponse("Server Error");
        }
      });
    } catch (error) {
      console.error(error);
   
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        onChange={(e) => {
          setData({...data,username:e.target.value});
        }}
        value={data.username}
        type="text"
        placeholder="Enter Username"
      />
      <input
        onChange={(e) => {
          setData({...data,password:e.target.value});
        }}
        value={data.password}
        type="password"
        placeholder="Enter password"
      />
      <p>{response}</p>
      <button type="submit" style={{ width: "10vw", height: "10vh" }}>
        Submit
      </button>
    </form>
  );
}
