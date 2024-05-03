export declare const authTokenPattern: RegExp;
/**
 * MOTIVATION reading authToken from .npmrc
 *
 * Parses authentication tokens from configuration data.
 * Lines matching the pattern "key:_authToken=value" are processed
 *
 * @param {string} data - Configuration data as a multiline string.
 * @returns {Object} Dictionary of keys and their corresponding values.
 */
export declare function extractTokens(data: string): {
    [key: string]: string;
};
