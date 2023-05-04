import React from "react";
import Row, { Cell } from "../../styles/Dashboard/Row";
import Checkbox from "../Checkbox";
import { lessonFormSchema } from "../../lib/lessonFormSchema";
import { useAppData } from "../../context/AppDataContext";
import { formatEducationLevel, formatSubject } from "../../lib/stringUtils";
import { CheckSvgData, CrossSvgData } from "../../lib/svgIconData";
import styled, { useTheme } from "styled-components";
import IconsContainer from "../../styles/Dashboard/IconsContainer";
import { useNavigate, useSubmit } from "react-router-dom";
import IconStyles from "../../styles/Dashboard/IconStyles";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import { Play } from "@styled-icons/fluentui-system-regular/Play";
import SvgIcon from "../SvgIcon";

function LessonRow({
    lesson,
    setSelectedLesson,
    PublishModal,
    InvalidModal,
    UnpublishModal,
    DeleteModal,
}) {
    const [checked, setChecked] = React.useState(lesson.is_published);
    const { subjectOptions, educationLevels } = useAppData();
    const theme = useTheme();
    const submit = useSubmit();
    const navigate = useNavigate();

    return (
        <Row style={{ minHeight: "56px" }}>
            <Cell> {lesson.title || "N/A"} </Cell>
            <Cell> {formatSubject(lesson.subject) || "N/A"} </Cell>
            <Cell>{formatEducationLevel(lesson.education_level) || "N/A"}</Cell>
            <Cell>{new Date(lesson.created_at).toLocaleDateString()}</Cell>
            <Cell style={{ paddingLeft: "20px" }}>
                <Checkbox
                    checked={lesson.is_published}
                    onChange={e => {
                        if (e.target.checked) {
                            const validate = lessonFormSchema({
                                subjectOptions,
                                educationLevels,
                            }).safeParse(lesson);

                            if (validate.success) {
                                setSelectedLesson(lesson);
                                PublishModal.handleOpen();
                            } else {
                                // console.log(lesson);
                                // console.log(validate);
                                InvalidModal.handleOpen();
                            }
                        } else {
                            setSelectedLesson(lesson);
                            UnpublishModal.handleOpen();
                        }
                    }}
                />
            </Cell>
            <Cell style={{ paddingLeft: "10px" }}>
                {lesson.is_published ? (
                    <SvgIcon
                        svgData={
                            lesson.is_verified ? CheckSvgData : CrossSvgData
                        }
                        fill={
                            lesson.is_verified
                                ? "gradient"
                                : `${theme.colours.error}`
                        }
                        size="40px"
                    />
                ) : (
                    <p>N/A</p>
                )}
            </Cell>
            <IconsContainer>
                <DeleteIcon
                    onClick={() => {
                        setSelectedLesson(lesson);
                        DeleteModal.handleOpen();
                    }}
                />
                <EditIcon
                    onClick={() => navigate(`/edit-lesson?id=${lesson.id}`)}
                />
                <PlayIcon
                    onClick={() =>
                        navigate(
                            `/lessons/${lesson.title.replaceAll(" ", "-")}?id=${
                                lesson.id
                            }`
                        )
                    }
                />
            </IconsContainer>
        </Row>
    );
}

const EditIcon = styled(EditAlt)`
    ${IconStyles}
`;
const DeleteIcon = styled(Delete)`
    ${IconStyles}
`;
const PlayIcon = styled(Play)`
    ${IconStyles}
`;

export default LessonRow;
