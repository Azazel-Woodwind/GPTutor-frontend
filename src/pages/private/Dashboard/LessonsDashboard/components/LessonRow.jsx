import React from "react";
import { lessonSchema } from "@/lib/schemas/lessonFormSchema";
import { useAppData } from "@/context/AppDataContext";
import { formatEducationLevel, formatSubject } from "@/utils/string";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import { Play } from "@styled-icons/fluentui-system-regular/Play";
import StatusChip from "./StatusChip";
import { Publish } from "@styled-icons/entypo/Publish";
import { Unpublished } from "@styled-icons/material-outlined/Unpublished";
import Row from "../../components/Row";
import IconStyles from "../../components/IconStyles";
import Tooltip from "@/components/common/dataDisplay/Tooltip";
import IconsContainer from "../../components/IconsContainer";
import Cell from "../../components/Cell";

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
            <Cell
                content={`${lesson.author.first_name} ${lesson.author.last_name}`}>
                {`${lesson.author.first_name} ${lesson.author.last_name}`.trim() ||
                    "N/A"}
            </Cell>
            <Cell content={lesson.created_at}>
                {new Date(lesson.created_at).toLocaleDateString()}
            </Cell>
            <Cell>
                <StatusChip isPublished={lesson.is_published} />
            </Cell>
            <IconsContainer>
                {!lesson.is_published ? (
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

export default LessonRow;
