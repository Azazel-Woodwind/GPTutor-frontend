import React from "react";
import Row, { Cell } from "../../../styles/Dashboard/Row";
import { lessonSchema } from "../../../lib/lessonFormSchema";
import { useAppData } from "../../../context/AppDataContext";
import { formatEducationLevel, formatSubject } from "../../../lib/stringUtils";
import styled, { useTheme } from "styled-components";
import IconsContainer from "../../../styles/Dashboard/IconsContainer";
import { useNavigate } from "react-router-dom";
import IconStyles from "../../../styles/Dashboard/IconStyles";
import { EditAlt } from "@styled-icons/boxicons-regular";
import { Delete } from "@styled-icons/fluentui-system-regular";
import { Play } from "@styled-icons/fluentui-system-regular/Play";
import StatusChip from "./StatusChip";
import { Publish } from "@styled-icons/entypo/Publish";
import { Unpublished } from "@styled-icons/material-outlined/Unpublished";
import { Check } from "@styled-icons/material/Check";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import Tooltip from "../../../components/Tooltip";

function LessonRow({
    lesson,
    setSelectedLesson,
    PublishModal,
    InvalidModal,
    UnpublishModal,
    DeleteModal,
    EditModal,
    onAdminDashboard = false,
    ApproveModal,
    RejectModal,
}) {
    const { subjectOptions, educationLevels, examBoards } = useAppData();
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Row style={{ minHeight: "56px" }}>
            <Cell content={lesson.title}> {lesson.title || "N/A"} </Cell>
            {onAdminDashboard && (
                <>
                    <Cell content={lesson.author.first_name}>
                        {lesson.author.first_name || "N/A"}
                    </Cell>
                    <Cell content={lesson.author.last_name}>
                        {lesson.author.last_name || "N/A"}
                    </Cell>
                </>
            )}
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
                {onAdminDashboard && (
                    <>
                        <Tooltip label={"Approve Lesson"}>
                            <ApproveIcon
                                disabled={lesson.status !== "Pending"}
                                onClick={() => {
                                    setSelectedLesson(lesson);
                                    ApproveModal.handleOpen();
                                }}
                            />
                        </Tooltip>
                        <Tooltip label={"Reject Lesson"}>
                            <RejectIcon
                                disabled={lesson.status !== "Pending"}
                                onClick={() => {
                                    setSelectedLesson(lesson);
                                    RejectModal.handleOpen();
                                }}
                            />
                        </Tooltip>
                    </>
                )}
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
                            if (lesson.status === "Verified") {
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

const ApproveIcon = styled(Check)`
    ${IconStyles}
`;

const RejectIcon = styled(CloseOutline)`
    ${IconStyles}
`;

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
