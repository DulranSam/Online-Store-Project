import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main";
import Social from "./components/Social";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/social" element={<Social></Social>}></Route>
      </Routes>
    </BrowserRouter>
  );
}




