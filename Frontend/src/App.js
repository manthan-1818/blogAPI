import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login.js";
import Signup from "./Components/Signup.js";
import Dashboard from "./Components/Dashboard";
import Blog from "./Components/Blog.js";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLogin(true);
    }
  };

  const handleLogin = () => {
    setIsLogin(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isLogin ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/blog"
          element={isLogin ? <Blog /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/Blog" element={<Blog />} />
//         <Route path="/preview/:id" element={<Preview />} />
//       </Routes>
//     </Router>
//   );
// }
