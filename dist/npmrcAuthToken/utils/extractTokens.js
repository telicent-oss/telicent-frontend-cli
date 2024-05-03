import { authTokenPattern } from "./authTokenPattern.js";
import { mask } from "./mask.js";
/**
 * MOTIVATION reading authToken from .npmrc
 *
 * Parses authentication tokens from configuration data.
 * Lines matching the pattern "key:_authToken=value" are processed
 *
 * TODO extractTokens replace with script that reads (and cleans) `yarn config list`
 * WHEN we care deeply about robustly resolving the correct value (we don't now, as its a local-only tool))
 * @param {string} data - Configuration data as a multiline string.
 * @returns {Object} Dictionary of keys and their corresponding values.
 */
export function extractTokens(data, pattern = authTokenPattern) {
    const tokens = {};
    const lines = data.split("\n");
    lines.forEach((line) => {
        const cleanLine = line.trim();
        if (cleanLine &&
            !cleanLine.startsWith("#") &&
            cleanLine.toLocaleLowerCase().includes(":_authtoken=")) {
            // Ignore comments and empty lines
            const match = cleanLine.match(pattern);
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