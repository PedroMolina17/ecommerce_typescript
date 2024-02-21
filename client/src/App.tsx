import "./App.css";
import "./index.css";
import Navigation from "./Components/Navigation";
import Slider from "./Components/Slider";
import SingUp from "./Components/SingUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <>
        <Navigation />
        <Routes>
          <Route path="/signup" element={<SingUp />} />
          <Route path="/" element={<Slider />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
