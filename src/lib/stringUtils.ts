export function capitaliseFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatEducationLevel(level: string) {
    switch (level) {
        case "gcse":
            return "GCSE";
        case "a-level":
            return "A-Level";
        case "ks3":
            return "KS3";
        default:
            return level;
    }
}

export function formatSubject(subject: string) {
    switch (subject) {
        case "mathematics":
            return "Maths";
        case "physics":
            return "Physics";
        case "chemistry":
            return "Chemistry";
        case "biology":
            return "Biology";
        case "art":
            return "Art";
        case "business":
            return "Business";
        case "computer_science":
            return "Computer Science";
        case "english_literature":
            return "English Literature";
        case "english_language":
            return "English Language";
        case "geography":
            return "Geography";
        case "history":
            return "History";
        case "ict":
            return "ICT";
        case "music":
            return "Music";
        case "science":
            return "Science";
        default:
            return subject;
    }
}