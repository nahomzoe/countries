// import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Countries />} />
          <Route path="country/:countryName" element={<CountryDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
