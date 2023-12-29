import React from "react";
import SubjectsAPI from "../api/SubjectAPI";
import EducationLevelsAPI from "../api/EducationLevelAPI";
import ExamBoardAPI from "../api/ExamBoardAPI";
import UsagePlanAPI from "../api/UsagePlansAPI";
import Loading from "@/components/common/feedback/Loading";
import { useNotification } from "./NotificationContext";

/**
 * Context for providing application-wide data.
 */
export const AppDataContext = React.createContext({
    subjectOptions: [],
    educationLevels: [],
    examBoards: [],
    usagePlans: {},
});

/**
 * Provides a context wrapper for application-wide data such as subjects, education levels, exam boards, and usage plans.
 *
 * @param {ReactNode} children - The child components to be rendered within the provider.
 * @returns {ReactNode} A context provider wrapping children.
 */
export function AppDataContextProvider({ children }) {
    const [subjectOptions, setSubjectOptions] = React.useState([]);
    const [educationLevels, setEducationLevels] = React.useState([]);
    const [examBoards, setExamBoards] = React.useState([]);
    const [fetching, setFetching] = React.useState(true);
    const [usagePlans, setUsagePlans] = React.useState({});

    const { sendNotification } = useNotification();

    // Fetch and set data for subjects, education levels, exam boards, and usage plans on component mount
    React.useEffect(() => {
        // use Promise.allSettled
        const fetch = async () => {
            // const [subjects, educationLevels, examBoards, usagePlans]
            const results = await Promise.allSettled([
                SubjectsAPI.getAll(),
                EducationLevelsAPI.getAll(),
                ExamBoardAPI.getAll(),
                UsagePlanAPI.getAll(),
            ]);

            const pairs = [
                setSubjectOptions,
                setEducationLevels,
                setExamBoards,
                setUsagePlans,
            ].map((setter, i) => [results[i], setter]);
            for (const [result, setter] of pairs) {
                if (result.status === "rejected") {
                    console.error(result.reason);
                    sendNotification({
                        type: "error",
                        label: `Error fetching data: ${result.reason}`,
                    });
                    continue;
                }
                setter(result.value);
            }
            setFetching(false);
        };

        fetch();
    }, []);

    return (
        <AppDataContext.Provider
            value={{ subjectOptions, educationLevels, examBoards, usagePlans }}>
            {fetching ? <Loading /> : <>{children}</>}
        </AppDataContext.Provider>
    );
}

/**
 * Custom hook to access the AppDataContext.
 *
 * @returns {Object} The context data containing subjectOptions, educationLevels, examBoards, and usagePlans.
 */
export function useAppData() {
    return React.useContext(AppDataContext);
}
