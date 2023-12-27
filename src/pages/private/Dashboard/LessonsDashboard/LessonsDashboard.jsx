import React from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/context/NotificationContext";
import useModal from "@/hooks/useModal/useModal";
import PublishLessonModal from "./components/PublishLessonModal";
import InvalidLessonModal from "./components/InvalidLessonModal";
import UnpublishLessonModal from "./components/UnpublishLessonModal";
import DeleteLessonModal from "./components/DeleteLessonModal";
import Button from "@/components/common/input/Button/Button";
import LessonRow from "./components/LessonRow";
import EditLessonModal from "./components/EditLessonModal";
import { ErrorOutline } from "@styled-icons/material/ErrorOutline";
import TextWrapper from "@/components/utils/TextWrapper";
import Table from "../components/Table";
import Row from "../components/Row";
import Cell from "../components/Cell";

/**
 * A dashboard page that allows administrators to view and manage lessons.
 *
 * @page
 * @route /dashboard/lessons
 * @accessLevel 3 - Administrator
 * @returns {JSX.Element} - Renders a table of lessons
 */
function LessonsDashboard() {
    const lessons = useLoaderData();
    const navigate = useNavigate();
    const res = useActionData();
    const { sendNotification } = useNotification();

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
                                ApproveModal={ApproveModal}
                                RejectModal={RejectModal}
                            />
                            {lesson.status === "Rejected" &&
                                lesson.rejection_reason && (
                                    <RejectionReasonContainer>
                                        <ErrorOutline size="1.5rem" />
                                        <TextWrapper>
                                            {lesson.rejection_reason}
                                        </TextWrapper>
                                    </RejectionReasonContainer>
                                )}
                        </div>
                    ))}
                <Button
                    outline
                    style={{ width: "fit-content", marginTop: "0.81rem" }}
                    onClick={() => navigate("/create-lesson")}>
                    Create New Lesson
                </Button>
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
            <ApproveModalComponent {...ApproveModal.ModalProps} type="dropIn">
                <EditLessonModal
                    lesson={selectedLesson}
                    handleClose={ApproveModal.handleClose}
                />
            </ApproveModalComponent>

            <RejectModalComponent {...RejectModal.ModalProps} type="dropIn">
                <EditLessonModal
                    lesson={selectedLesson}
                    handleClose={RejectModal.handleClose}
                />
            </RejectModalComponent>
        </Container>
    );
}

const RejectionReasonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 6px 7px;

    width: 100%;

    background-color: ${props => props.theme.colours.error};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.875rem;
`;

export default LessonsDashboard;
