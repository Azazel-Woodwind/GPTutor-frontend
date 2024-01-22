export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function interpolateArrays(array1, array2, factor) {
    if (array1.length !== array2.length) return null;

    return array1.map((val, i) => val + (array2[i] - val) * factor);
}

export function splitBezierAtT(p0, p1, p2, p3, t) {
    let q0 = (1 - t) * p0 + t * p1;
    let q1 = (1 - t) * p1 + t * p2;
    let q2 = (1 - t) * p2 + t * p3;

    let r0 = (1 - t) * q0 + t * q1;
    let r1 = (1 - t) * q1 + t * q2;

    let s = (1 - t) * r0 + t * r1;

    return [s, r1, q2, p3];
}

export function roundToNearestMultiple(number, multiple) {
    return Math.round(number / multiple) * multiple;
}

export function clamp(number, min, max) {
    return Math.min(Math.max(number, min), max);
}
