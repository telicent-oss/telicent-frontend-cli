const padRightWithLength = (length) => (str) => {
    return str + ' '.repeat(Math.max(0, length - str.length + 1));
};
export default padRightWithLength;
//# sourceMappingURL=padRightWithLength.js.map