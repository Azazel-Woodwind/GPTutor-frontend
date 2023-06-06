import React from "react";
import { useNavigate } from "react-router-dom";

function RedirectToWaitingList() {
    const navigate = useNavigate();
    console.log("REDIRECTING TO WAITING LIST");
    React.useEffect(() => {
        navigate("/");
    }, [navigate]);
    return <></>;
}

export default RedirectToWaitingList;
