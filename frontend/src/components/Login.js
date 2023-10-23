import React, { useState} from "react";
import "./Login.css";
import Axios from "axios";

export default function Login(props) {
  const[data,setData] = useState({
    username:"",
    password:""
  });
  const [response, setResponse] = useState("");
  const [loading,setLoading] = useState(false);


  async function Login(e) {
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
      data.username.current.value ="";
      data.password.current.value = "";
    }
  }

  return (
    <div className="container">
    <div className="login">
      <h1>Login</h1>
      <form action="loginForm" onSubmit={Login}>
        <div className="fields">
          <p>Username : </p>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setData({...data,username:e.target.value});
            }}
            value={data.username}
            className="usernameval"
          />
          <p>Password : </p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setData({...data,password:e.target.value});
            }}
            value={data.password}
            className="passwordval"
            required=""
          />
          <br />
          <p>{response}</p>
          <button type="submit" style={{ width: "10vw", height: "10vh" }}>
            {loading===true? "Loading..." : "Login"}</button>
          <br />
          </div>
      </form>
    </div>
  </div>
  
  );
}
