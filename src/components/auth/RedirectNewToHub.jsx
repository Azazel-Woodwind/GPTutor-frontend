import React from "react";
import { useAuth } from "@/context/SessionContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RedirectNewToHub({ children }) {
    const { session } = useAuth();
    const location = useLocation();

    if (session.user.new && location.pathname !== "/hub") {
        return <Navigate to="/hub" replace={true} />;
    }

    return children || <Outlet />;
}

export default RedirectNewToHub;
