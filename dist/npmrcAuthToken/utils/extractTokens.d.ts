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
export declare function extractTokens(data: string, pattern?: RegExp): {
    [key: string]: string;
};
