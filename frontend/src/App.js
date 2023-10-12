import './App.css';
import Register from "./components/Registration";
import StoreFunctions from "./components/StoreFunctions";
import Login from "./components/Login";
import GetData from "./components/getUsers";

export default function App() {
  return (
    <div className="container">
    <Login></Login>
    <br></br>
      <Register></Register>
      <br></br>
      <StoreFunctions></StoreFunctions>
      <br></br>
      <GetData></GetData>
    </div>
  );
}


