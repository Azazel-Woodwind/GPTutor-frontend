import { IMAGE_LINK_REGEX, SVG_REGEX } from "../lib/regexes";
import image from "../assets/image-load-failed.png";

export function capitaliseFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatEducationLevel(level) {
    switch (level) {
        case "gcse":
            return "GCSE";
        case "a-level":
            return "A-Level";
        case "ks3":
            return "KS3";
        case "other":
            return "Other";
        default:
            return level;
    }
}

export function formatSubject(subject) {
    switch (subject) {
        case "mathematics":
            return "Mathematics";
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

export function svgStringToSrc(svgString) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export function formatImageSource(src) {
    if (IMAGE_LINK_REGEX.test(src)) {
        return src;
    } else if (SVG_REGEX.test(src)) {
        return svgStringToSrc(src);
    } else {
        return image;
    }
}
