import './App.css';
import Register from "./components/Registration";
import StoreFunctions from "./components/StoreFunctions";
import Login from "./components/Login";

export default function App() {

  return (
    <div className="container">
       <Register></Register>
       <Login></Login>
      <StoreFunctions></StoreFunctions>
  
    </div>
  );
}


