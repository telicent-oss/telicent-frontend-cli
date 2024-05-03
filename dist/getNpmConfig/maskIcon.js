export function maskToken(token) {
    const visibleLength = 3; // Number of characters to show unmasked
    const maskLength = Math.min(token.length, visibleLength); // Ensure non-negative
    return token.substring(0, visibleLength) + '*'.repeat(maskLength);
}
//# sourceMappingURL=maskIcon.js.map