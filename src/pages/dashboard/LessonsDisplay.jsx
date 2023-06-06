import React from "react";
import { useActionData, useLoaderData, useSubmit } from "react-router-dom";
import LessonAPI from "../../api/LessonAPI";
import styled, { css, useTheme } from "styled-components";
import { formatEducationLevel, formatSubject } from "../../lib/stringUtils";
import { useNavigate } from "react-router-dom";
import { PublishedWithChanges } from "@styled-icons/material/PublishedWithChanges";
import { Play } from "@styled-icons/fluentui-system-regular/Play";
import Table from "../../styles/Dashboard/Table";
import Row, { Cell } from "../../styles/Dashboard/Row";
import IconsContainer from "../../styles/Dashboard/IconsContainer";
import IconStyles from "../../styles/Dashboard/IconStyles";
import Checkbox from "../../components/Checkbox";
import SvgIcon from "../../components/SvgIcon";
import { CheckSvgData, CrossSvgData } from "../../lib/svgIconData";
import { lessonFormSchema } from "../../lib/lessonFormSchema";
import { useAppData } from "../../context/AppDataContext";
import { useNotification } from "../../context/NotificationContext";
import useModal from "../../hooks/useModal";
import PublishLessonModal from "../../components/Dashboard/PublishLessonModal";
import InvalidLessonModal from "../../components/Dashboard/InvalidLessonModal";
import UnpublishLessonModal from "../../components/Dashboard/UnpublishLessonModal";
import DeleteLessonModal from "../../components/Dashboard/DeleteLessonModal";
import CustomButton from "../../components/Button";
import LessonRow from "../../components/Dashboard/LessonRow";
import EditLessonModal from "../../components/Dashboard/EditLessonModal";
import { ErrorOutline } from "@styled-icons/material/ErrorOutline";
import { TextWrapper } from "../../styles/TextWrappers";

function LessonsDisplay({ onAdminDashboard = false }) {
    const lessons = useLoaderData();
    const navigate = useNavigate();
    const res = useActionData();
    const sendNotification = useNotification();

    const { Modal: PublishModalComponent, ...PublishModal } = useModal({
        initialOpen: false,
    });

    const { Modal: InvalidModalComponent, ...InvalidModal } = useModal({
        initialOpen: false,
    });

    const { Modal: UnpublishModalComponent, ...UnpublishModal } = useModal({
        initialOpen: false,
    });

    const { Modal: DeleteModalComponent, ...DeleteModal } = useModal({
        initialOpen: false,
    });

    const { Modal: EditModalComponent, ...EditModal } = useModal({
        initialOpen: false,
    });

    const { Modal: ApproveModalComponent, ...ApproveModal } = useModal({
        initialOpen: false,
    });

    const { Modal: RejectModalComponent, ...RejectModal } = useModal({
        initialOpen: false,
    });

    const [selectedLesson, setSelectedLesson] = React.useState(null);

    React.useEffect(() => {
        if (!res) return;
        sendNotification({
            label: res.message,
            duration: 5,
            type: res.ok ? "success" : "error",
        });
    }, [res]);

    return (
        <Container>
            <h1> My Lessons</h1>
            <Table>
                <Row headings>
                    <Cell>Title</Cell>
                    <Cell>Subject</Cell>
                    <Cell>Education Level</Cell>
                    <Cell>Created On</Cell>
                    <Cell>Status</Cell>
                </Row>
                {lessons
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map(lesson => (
                        <div style={{ width: "100%" }}>
                            <LessonRow
                                key={lesson.created_at}
                                lesson={lesson}
                                setSelectedLesson={setSelectedLesson}
                                PublishModal={PublishModal}
                                InvalidModal={InvalidModal}
                                UnpublishModal={UnpublishModal}
                                DeleteModal={DeleteModal}
                                EditModal={EditModal}
                                onAdminDashboard={onAdminDashboard}
                                ApproveModal={ApproveModal}
                                RejectModal={RejectModal}
                            />
                            {lesson.status === "Rejected" &&
                                lesson.rejection_reason && (
                                    <RejectionReasonContainer>
                                        <ErrorOutline size="1.5em" />
                                        <TextWrapper>
                                            {lesson.rejection_reason}
                                        </TextWrapper>
                                    </RejectionReasonContainer>
                                )}
                        </div>
                    ))}
                <CustomButton
                    outline
                    style={{ width: "fit-content", marginTop: "13px" }}
                    onClick={() => navigate("/create-lesson")}>
                    Create New Lesson
                </CustomButton>
            </Table>

            <PublishModalComponent {...PublishModal.ModalProps} type="dropIn">
                <PublishLessonModal
                    lesson={selectedLesson}
                    handleClose={PublishModal.handleClose}
                />
            </PublishModalComponent>

            <InvalidModalComponent {...InvalidModal.ModalProps} type="dropIn">
                <InvalidLessonModal handleClose={InvalidModal.handleClose} />
            </InvalidModalComponent>

            <UnpublishModalComponent
                {...UnpublishModal.ModalProps}
                type="dropIn">
                <UnpublishLessonModal
                    lesson={selectedLesson}
                    handleClose={UnpublishModal.handleClose}
                />
            </UnpublishModalComponent>

            <DeleteModalComponent {...DeleteModal.ModalProps} type="dropIn">
                <DeleteLessonModal
                    lesson={selectedLesson}
                    handleClose={DeleteModal.handleClose}
                />
            </DeleteModalComponent>

            <EditModalComponent {...EditModal.ModalProps} type="dropIn">
                <EditLessonModal
                    lesson={selectedLesson}
                    handleClose={EditModal.handleClose}
                />
            </EditModalComponent>
            {onAdminDashboard && (
                <>
                    <ApproveModalComponent
                        {...ApproveModal.ModalProps}
                        type="dropIn">
                        <EditLessonModal
                            lesson={selectedLesson}
                            handleClose={ApproveModal.handleClose}
                        />
                    </ApproveModalComponent>

                    <RejectModalComponent
                        {...RejectModal.ModalProps}
                        type="dropIn">
                        <EditLessonModal
                            lesson={selectedLesson}
                            handleClose={RejectModal.handleClose}
                        />
                    </RejectModalComponent>
                </>
            )}
        </Container>
    );
}

const RejectionReasonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 7px;

    width: 100%;

    background-color: ${props => props.theme.colours.error};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export default LessonsDisplay;
