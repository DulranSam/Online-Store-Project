import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Social from "./components/Social";
import Login from "./components/Login";
import Register from "./components/Registration";
import TShirts from "./components/TShirts";
import Cart from "./components/Cart";
import Cases from "./components/Cases";
import Shoes from "./components/Shoes";
import Confirmedorder from "./components/ConfirmedOrder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route
          path="/confirmedorder"
          element={<Confirmedorder></Confirmedorder>}
        />
        <Route path="/social" element={<Social></Social>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/login/register" element={<Register></Register>}></Route>
        <Route path="/tshirts" element={<TShirts></TShirts>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/cases" element={<Cases></Cases>}></Route>
        <Route path="/shoes" element={<Shoes></Shoes>}></Route>
        <Route path="/more" element={<more></more>} />
      </Routes>
    </BrowserRouter>
  );
}
