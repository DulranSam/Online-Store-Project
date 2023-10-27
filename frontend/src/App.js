import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/Main";
import Social from "./components/Social";
import Login from "./components/Login";
import Register from "./components/Registration";
import TShirts from "./components/TShirts";
import Hoodies from "./components/Hoodies";
import Cases from "./components/Cases";
import Shoes from "./components/Shoes";


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/social" element={<Social></Social>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/tshirts" element={<TShirts></TShirts>}></Route>
        <Route path="/hoodies" element={<Hoodies></Hoodies>}></Route>
        <Route path="/cases" element={<Cases></Cases>}></Route>
        <Route path="/shoes" element={<Shoes></Shoes>}></Route>
      </Routes>
    </BrowserRouter>
  );
}




