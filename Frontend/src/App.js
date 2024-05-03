import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import Dashboard from "./Components/Dashboard";
import Blog from "./Components/Blog.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Preview from "./Components/Preview.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/preview/:_id" element={<Preview />} />
      </Routes>
    </Router>
  );
}

export default App;
