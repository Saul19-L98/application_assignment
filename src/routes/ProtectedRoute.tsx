import { useContextHook } from "../hooks/authContext";
import {ReactNode} from 'react'
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";


interface ProtectedRouteProps{
    isAllowed?: boolean;
    children?: ReactNode;
};


function ProtectedRoute({children,isAllowed}:ProtectedRouteProps){
    const { loading } = useContextHook();
    console.log(isAllowed)
    if(loading) return <Spinner />;
    if(!isAllowed) return <Navigate to="/sign-up"/>

    return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute;