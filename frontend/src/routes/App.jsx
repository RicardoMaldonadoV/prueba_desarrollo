import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Container
import Layout from "../containers/Layout";
//Views
import Home from "../pages/Home";
import Menu from "../pages/Menu"
//Renders
const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/menu/" element={<Menu />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
