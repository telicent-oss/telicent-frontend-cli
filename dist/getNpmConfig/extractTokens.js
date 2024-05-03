import { mask } from "./mask.js";
export const authTokenPattern = /(.*):_authToken=(.*)/i;
/**
 * MOTIVATION reading authToken from .npmrc
 *
 * Parses authentication tokens from configuration data.
 * Lines matching the pattern "key:_authToken=value" are processed
 *
 * @param {string} data - Configuration data as a multiline string.
 * @returns {Object} Dictionary of keys and their corresponding values.
 */
export function extractTokens(data) {
    const tokens = {};
    const lines = data.split("\n");
    lines.forEach((line) => {
        const cleanLine = line.trim();
        if (cleanLine &&
            !cleanLine.startsWith("#") &&
            cleanLine.toLocaleLowerCase().includes(":_authtoken=")) {
            // Ignore comments and empty lines
            const match = cleanLine.match(authTokenPattern);
            if (match) {
                const [_, key, value] = match;
                tokens[key] = value;
            }
            else {
                throw new Error(`Warning: Unable to parse line: '${mask(cleanLine)}'`);
            }
        }
    });
    return tokens;
}
//# sourceMappingURL=extractTokens.js.map