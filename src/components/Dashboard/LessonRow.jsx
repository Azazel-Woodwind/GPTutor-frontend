import React from "react";
import Row, { Cell } from "../../styles/Dashboard/Row";
import Checkbox from "../Checkbox";
import { lessonFormSchema, lessonSchema } from "../../lib/lessonFormSchema";
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
import StatusChip from "./StatusChip";
import { Publish } from "@styled-icons/entypo/Publish";
import { Unpublished } from "@styled-icons/material-outlined/Unpublished";
import Tooltip from "../Tooltip";

function LessonRow({
    lesson,
    setSelectedLesson,
    PublishModal,
    InvalidModal,
    UnpublishModal,
    DeleteModal,
    EditModal,
}) {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Row style={{ minHeight: "56px" }}>
            <Cell content={lesson.title}> {lesson.title || "N/A"} </Cell>
            <Cell content={lesson.subject}>
                {formatSubject(lesson.subject) || "N/A"}
            </Cell>
            <Cell content={lesson.education_level}>
                {lesson.education_level
                    ? formatEducationLevel(lesson.education_level)
                    : "N/A"}
            </Cell>
            <Cell content={lesson.created_at}>
                {new Date(lesson.created_at).toLocaleDateString()}
            </Cell>
            <Cell>
                <StatusChip status={lesson.status} />
            </Cell>
            {/* <Cell style={{ paddingLeft: "20px" }}>
                <Checkbox
                    checked={lesson.is_published}
                    onChange={e => {
                        if (e.target.checked) {
                            const validate = lessonFormSchema({
                                subjectOptions,
                                educationLevels,
                                examBoards,
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
            <Cell style={{ paddingLeft: "10px" }} content={lesson.is_published}>
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
                    "N/A (not published)"
                )}
            </Cell> */}
            <IconsContainer>
                {["Draft", "Rejected"].includes(lesson.status) ? (
                    <Tooltip label={"Publish Lesson"}>
                        <PublishIcon
                            onClick={() => {
                                const validate = lessonSchema({
                                    subjectOptions,
                                    educationLevels,
                                    examBoards,
                                }).safeParse(lesson);

                                if (validate.success) {
                                    setSelectedLesson(lesson);
                                    PublishModal.handleOpen();
                                } else {
                                    console.log(lesson);
                                    console.log(validate);
                                    InvalidModal.handleOpen();
                                }
                            }}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip label={"Unpublish Lesson"}>
                        <UnpublishIcon
                            onClick={() => {
                                setSelectedLesson(lesson);
                                UnpublishModal.handleOpen();
                            }}
                        />
                    </Tooltip>
                )}
                <Tooltip label={"Delete Lesson"}>
                    <DeleteIcon
                        onClick={() => {
                            setSelectedLesson(lesson);
                            DeleteModal.handleOpen();
                        }}
                    />
                </Tooltip>
                <Tooltip label={"Edit Lesson"}>
                    <EditIcon
                        onClick={() => {
                            if (lesson.is_published) {
                                setSelectedLesson(lesson);
                                EditModal.handleOpen();
                            } else {
                                navigate(`/edit-lesson?id=${lesson.id}`);
                            }
                        }}
                    />
                </Tooltip>
                <Tooltip label={"Sit Lesson"}>
                    <PlayIcon
                        onClick={() =>
                            navigate(
                                `/lessons/${lesson.title.replaceAll(
                                    " ",
                                    "-"
                                )}?id=${lesson.id}`
                            )
                        }
                    />
                </Tooltip>
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
const PublishIcon = styled(Publish)`
    ${IconStyles}
`;
const UnpublishIcon = styled(Unpublished)`
    ${IconStyles}
`;

export default LessonRow;
