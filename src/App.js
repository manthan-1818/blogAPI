import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Dashboard from './Dashboard';
import Blog from './Blog';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Blog" element={<Blog />} /> 
      </Routes>
    </Router>
  );
}

export default App;
