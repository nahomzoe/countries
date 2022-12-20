// import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";

function App() {
  const [country, setCountry] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Countries setCountry={setCountry} />} />
          <Route
            path="country/:name"
            element={<CountryDetail country={country} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
