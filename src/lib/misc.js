export function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function percentageToColour(percentage) {
    let r, g;

    if (percentage >= 50) {
        // Closer to 100% => greener
        r = Math.floor((255 * (100 - percentage)) / 50);
        g = 255;
    } else {
        // Closer to 0% => redder
        r = 255;
        g = Math.floor((255 * percentage) / 50);
    }

    return `rgb(${r}, ${g}, 0)`;
}
