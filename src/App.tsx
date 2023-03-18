import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/authContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Logging from "./pages/Loggin";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="/sign-in" element={<Register />}/>
            <Route path="/sign-up" element={<Logging />}/>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
