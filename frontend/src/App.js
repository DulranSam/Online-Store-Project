import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/Main";
import Social from "./components/Social";
import Login from "./components/Login";
import Register from "./components/Registration";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/social" element={<Social></Social>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}




