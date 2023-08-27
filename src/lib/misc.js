export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

export function interpolateColor(percentage, hex1, hex2) {
    const rgb1 = hexToRGB(hex1);
    const rgb2 = hexToRGB(hex2);
    const r = Math.round(rgb1[0] + percentage * (rgb2[0] - rgb1[0]));
    const g = Math.round(rgb1[1] + percentage * (rgb2[1] - rgb1[1]));
    const b = Math.round(rgb1[2] + percentage * (rgb2[2] - rgb1[2]));
    return `rgb(${r}, ${g}, ${b})`;
}
