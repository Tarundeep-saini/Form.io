import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Form_maker from "./Pages/Form_maker";
import axios from "axios";
import Form from "./Pages/Form";

function App() {
 
  axios.defaults.baseURL ="https://form-io-api.vercel.app";
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formMaker" element={<Form_maker />} />
        <Route path="/form/:creator" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
