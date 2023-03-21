import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { AuthProvider } from "./hooks/authContext";
import { QueryClientProvider,QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>,
)
