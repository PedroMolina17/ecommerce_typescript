import "./App.css";
import "./index.css";
import Navigation from "./Components/Navigation";
import Slider from "./Components/Slider";
import SingUp from "./Components/SingUp";
import Blogs from "./Components/Blogs";
import Acessories from "./Components/Acessories";
import Deals from "./Components/Deals";
import Electronic from "./Components/Electronic";
import Cellphones from "./Components/Cellphones";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
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
        </Routes>
      </>
    </Router>
  );
}

export default App;
