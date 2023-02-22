import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import New from "./pages/new/new";
import Register from "./pages/register/register";
import Single from "./pages/single/single";


function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />} />
        <Route path="/newtask" element={user ? <New /> : <Navigate replace to="/login" />} />
        <Route path="/:id" element={user ? <Single /> : <Navigate replace to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
