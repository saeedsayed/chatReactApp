import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";
import ResetPassword from "./Pages/ResetPassword";
import { useAuth } from "./context/AuthContext";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
