/**
 * Main function to retrieve and handle tokens from .npmrc.
 * Allows securely accessing config values without embedding secrets in scripts.
 */
declare const npmrcAuthToken: (tokenKey?: string) => void;
export default npmrcAuthToken;
