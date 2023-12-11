export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function interpolateArrays(array1, array2, factor) {
    if (array1.length !== array2.length) return null;

    return array1.map((val, i) => val + (array2[i] - val) * factor);
}
