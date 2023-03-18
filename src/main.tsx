import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { AuthProvider } from "./hooks/authContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
