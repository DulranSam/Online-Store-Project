import React, { useState,useReducer, useRef} from "react";
import Axios from "axios";
import "./Login.css";

export default function Login(props) {
  const[data,setData] = useState({
    username:"",
    password:""
  });
  const [response, setResponse] = useState("");
  const [loading,setLoading] = useReducer((loading)=>!loading,false);
  const username = useRef();
  const password = useRef();



  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
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
          alert(`Welcome back ${props.user}`);
          setResponse("Authorized")
        }else if(response.status===401){
          alert(`${data.username} Unauthorized`);
          setResponse("Unauthorized")
        }else if (response.status===400){
          setResponse("Username and password missing");
        }else{
          setResponse("Server Error");
        }
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
   
    }
    finally{
      username.current.value ="";
      password.current.value = "";
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
      ref={username}
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
        {loading===true? "Loading..." : "Submit"}
      </button>
    </form>
  );
}
