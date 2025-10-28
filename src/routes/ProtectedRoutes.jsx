import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
    const { isAuthenticated } = useContext(AuthContext);    

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}