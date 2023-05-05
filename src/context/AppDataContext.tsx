import * as React from "react";
import SubjectsAPI from "../api/SubjectAPI";
import {
    capitaliseFirstLetter,
    formatEducationLevel,
} from "../lib/stringUtils";
import EducationLevelsAPI from "../api/EducationLevelAPI";
import Loading from "../pages/Loading";
import ExamBoardAPI from "../api/ExamBoardAPI";

export const AppDataContext = React.createContext({
    subjectOptions: [],
    educationLevels: [],
    examBoards: [],
});

export function AppDataContextProvider({ children }: any) {
    const [subjectOptions, setSubjectOptions] = React.useState([]);
    const [educationLevels, setEducationLevels] = React.useState([]);
    const [examBoards, setExamBoards] = React.useState([]);
    const [fetching, setFetching] = React.useState(true);

    React.useEffect(() => {
        if (!fetching) {
            // console.log("Finished fetching app data");
            // console.log(subjectOptions, educationLevels);
        }
    }, [fetching]);

    React.useEffect(() => {
        Promise.all([
            SubjectsAPI.getAll()
                .then(res =>
                    res.map(subject =>
                        capitaliseFirstLetter(
                            subject.subject
                                .replaceAll("_", " ")
                                .replaceAll("ict", "ICT")
                        )
                    )
                )
                .then(setSubjectOptions),
            EducationLevelsAPI.getAll()
                .then(res =>
                    res.map(educationLevel =>
                        formatEducationLevel(educationLevel.education_level)
                    )
                )
                .then(setEducationLevels),
            ExamBoardAPI.getAll()
                .then(res => res.map(examBoard => examBoard.exam_board_name))
                .then(setExamBoards),
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
