import './App.css';
import React from "react";
import Login from "./components/Login";
import Details from "./components/Details";
import StockResults from "./components/StockResults";
import Error from "./components/Error";
import { Routes, Route } from "react-router-dom";
import CIKResults from './components/CIKResults';
import axios from 'axios'

function App() {


  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stocks" element={<StockResults />} />
        <Route path="/stocks/:ticker" element={<CIKResults />} />
        <Route path="/stocks/cik/:cik" element={<Details />} />
        <Route path="/404" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
