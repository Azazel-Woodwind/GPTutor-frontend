import React from "react";
import SubjectsAPI from "../api/SubjectAPI";
import EducationLevelsAPI from "../api/EducationLevelAPI";
import ExamBoardAPI from "../api/ExamBoardAPI";
import UsagePlanAPI from "../api/UsagePlansAPI";
import Loading from "@/pages/public/Loading/Loading";

export const AppDataContext = React.createContext({
    subjectOptions: [],
    educationLevels: [],
    examBoards: [],
});

export function AppDataContextProvider({ children }) {
    const [subjectOptions, setSubjectOptions] = React.useState([]);
    const [educationLevels, setEducationLevels] = React.useState([]);
    const [examBoards, setExamBoards] = React.useState([]);
    const [fetching, setFetching] = React.useState(true);
    const [usagePlans, setUsagePlans] = React.useState({});

    React.useEffect(() => {
        if (!fetching) {
            // console.log("Finished fetching app data");
            // console.log(subjectOptions, educationLevels);
        }
    }, [fetching]);

    React.useEffect(() => {
        Promise.all([
            SubjectsAPI.getAll().then(setSubjectOptions),
            EducationLevelsAPI.getAll().then(setEducationLevels),
            ExamBoardAPI.getAll().then(setExamBoards),
            UsagePlanAPI.getAll()
                .then(res => {
                    const temp = {};
                    res.forEach(usagePlan => {
                        temp[usagePlan.plan] = usagePlan.max_daily_tokens;
                    });
                    return temp;
                })
                .then(setUsagePlans),
        ]).then(() => {
            setFetching(false);
        });
    }, []);

    return (
        <AppDataContext.Provider
            value={{ subjectOptions, educationLevels, examBoards }}>
            {fetching ? <Loading /> : <>{children}</>}
        </AppDataContext.Provider>
    );
}

export function useAppData() {
    return React.useContext(AppDataContext);
}
