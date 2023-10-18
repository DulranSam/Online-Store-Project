import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Registration";
import Login from "./components/Login";
import StoreFunctions from "./components/StoreFunctions";
import UI from "./components/UI";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/store" element={<StoreFunctions></StoreFunctions>}></Route>
        <Route path="/buy" element={<UI></UI>}></Route>
        <Route path="/items" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

function Main() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
      <br></br>
      <button onClick={() => navigate("/store")}>store</button>
      <button onClick={() => navigate("/buy")}>buy</button>
      <button onClick={()=>{navigate("/items")}}>Items</button>
    </div>
  );
}



export default App;
