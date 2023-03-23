import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserCredentialsStore } from "./store/userCredentialsStore";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import NotFound from "./pages/NotFound";

function App() {

  const {userCredentials,userData} = useUserCredentialsStore();

  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute isAllowed={!!userCredentials?.user} />}>
            <Route path="/" element={
              <ProtectedRoute isAllowed={!!userCredentials?.user && userData?.rol === "employee"}>
                <Home />
              </ProtectedRoute>
            }/>
          </Route>
          <Route path="/dashboard" element={<ProtectedRoute isAllowed={!!userCredentials?.user} />}>
            <Route path="/dashboard" element={
              <ProtectedRoute isAllowed={!!userCredentials?.user && userData?.rol === "hrSpecialist"}>
                <DashBoard />
              </ProtectedRoute>
            }/>
          </Route>
          <Route path="/sign-up" element={<Register />}/>
          <Route path="/sign-in" element={<LogIn />}/>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
