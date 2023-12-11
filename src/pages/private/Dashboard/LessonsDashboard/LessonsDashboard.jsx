import React from "react";
import LessonsTable from "../components/LessonsTable";
import RouteProtector from "@/components/auth/RouteProtector";
import { ADMIN_ACCESS_LEVEL } from "@/lib/accessLevels";

function Lessons() {
    return (
        <RouteProtector accessLevel={ADMIN_ACCESS_LEVEL}>
            <LessonsTable onAdminDashboard={true} />
        </RouteProtector>
    );
}

export default Lessons;
