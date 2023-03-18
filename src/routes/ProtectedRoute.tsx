import { useContextHook } from "../hooks/authContext";
import {ReactNode} from 'react'
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

interface ProtectedRouteProps{
    children: ReactNode;
};

function ProtectedRoute({children}:ProtectedRouteProps){
    const { user,loading} = useContextHook();

    if(loading) return <Spinner />;
    if(!user) return <Navigate to="/sign-up"/>

    return <>{children}</>
}

export default ProtectedRoute;