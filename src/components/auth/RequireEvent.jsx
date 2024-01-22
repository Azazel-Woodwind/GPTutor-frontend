import React from "react";
import { useAuth } from "@/context/SessionContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireEvent({ children, event, redirect = "/hub" }) {
    const { event: currentEvent } = useAuth();
    const location = useLocation();

    if (currentEvent !== event) {
        return <Navigate to={redirect} state={{ from: location }} replace />;
    }

    return children || <Outlet />;
}

export default RequireEvent;
