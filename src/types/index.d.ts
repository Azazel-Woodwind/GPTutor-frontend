enum EducationLevel {
    KS3 = "ks3",
    GCSE = "gcse",
    ALEVEL = "a-level",
}

declare enum Subject {
    MATHEMATICS = "mathematics",
    PHYSICS = "physics",
    CHEMISTRY = "chemistry",
    BIOLOGY = "biology",
}

type User = {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    education_level: EducationLevel;
    subjects: Subject[];
    access_level: number;
};

type WaitingListMember = {
    first_name: string;
    last_name: string;
    email: string;
    education_level: EducationLevel;
    is_student: boolean;
    subjects: Subject[];
};

type Image = {
    link: string;
    description: string;
};

type LearningObjective = {
    title: string;
    description: string;
    images: Image[];
};

type Lesson = {
    id: string;
    title: string;
    subject: Subject;
    education_level: EducationLevel;
    exam_board: string;
    caption: string;
    learning_objectives: LearningObjective[];
    is_published: boolean;
    created_at?: string;
};

type ChatEntry = {
    role: string;
    content: string;
};
