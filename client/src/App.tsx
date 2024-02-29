import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Slider from "./Components/Slider";
import SingUp from "./Components/SingUp";
import Blogs from "./Components/Blogs";
import Acessories from "./Components/Acessories";
import Deals from "./Components/Deals";
import Electronic from "./Components/Electronic";
import Cellphones from "./Components/Cellphones";
import Sidebar from "./Components/Admin/Sidebar";
import Login from "./Components/Admin/Login";
import ProductDetails from "./Components/ProductDetails";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Navigation />
              <Routes>
                <Route path="/" element={<Slider />} />
                <Route path="/signup" element={<SingUp />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/accesories" element={<Acessories />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/electronics" element={<Electronic />} />
                <Route path="/cellphones" element={<Cellphones />} />
                <Route path="/electronics/:id" element={<ProductDetails />} />
              </Routes>
            </>
          }
        />
        <Route path="/admin/*" element={<AdminLayout />} />{" "}
        <Route path="/adminLogin/*" element={<Login />} />
      </Routes>
    </Router>
  );
}

const AdminLayout = () => (
  <Routes>
    <Route index element={<Sidebar />} />
  </Routes>
);

export default App;
