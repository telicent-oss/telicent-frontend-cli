import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import checkNpmContext, { TEFE } from "./checkNpmContext.js";
import { getTefeJson } from "../../utils/tefe.config.json.utils.js";
import fs from "fs";
import os from "os";
import { createRequire } from "module";

vi.mock("fs");
vi.mock("module", () => ({
  createRequire: vi.fn().mockReturnValue((modulePath) => {
    if (modulePath.endsWith("package.json")) {
      // Mock the package.json contents
      return { name: TEFE };
    } else if (modulePath.includes(TEFE)) {
      // Handle TEFE specific path
      return {}; // Mock the expected output for TEFE related module
    } else {
      throw new Error(`Module not found in ${modulePath}`);
    }
  }),
}));
vi.mock("../../utils/formatJsonFile.js", () => ({ default: vi.fn(() => '{}') }));
vi.mock("../../utils/tryCatch.js", () => ({ default: vi.fn() }));
vi.mock("../../utils/tefe.config.json.utils.js", () => ({
  getTefeJson: vi.fn(),
  TEFE_CONFIG: "./tefe.config.json",
}));

describe("checkNpmContext function", () => {
  let originalCwd;
  beforeAll(() => {
    originalCwd = process.cwd;
    process.cwd = vi.fn(() => "/mocked/path");
  });
  afterAll(() => {
    process.cwd = originalCwd;
  });
  it("handles being inside an npm package without TEFE_CONFIG file", () => {
    fs.existsSync.mockReturnValue(true);
    getTefeJson.mockReturnValue(false);
    const result = checkNpmContext();
    expect(result.join(os.EOL)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,true
        - is @telicent-oss/telicent-frontend-cli:,true, (@telicent-oss/telicent-frontend-cli)
        - has tefe installed:,
        - has ./tefe.config.json:,false"
    `);
  });
  it("handles being inside an npm package with TEFE_CONFIG file", () => {
    fs.existsSync.mockReturnValue(true);
    getTefeJson.mockReturnValue(true);
    const result = checkNpmContext();
    expect(result.join(os.EOL)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,true
        - is @telicent-oss/telicent-frontend-cli:,true, (@telicent-oss/telicent-frontend-cli)
        - has tefe installed:,
        - has ./tefe.config.json:,{}"
    `);
  });

  it("detects the TEFE package correctly", () => {
    fs.existsSync.mockReturnValue(true);
    const result = checkNpmContext();
    expect(result.join(os.EOL)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,true
        - is @telicent-oss/telicent-frontend-cli:,true, (@telicent-oss/telicent-frontend-cli)
        - has tefe installed:,
        - has ./tefe.config.json:,{}"
    `);
  });

  it("handles not being in an npm package", () => {
    fs.existsSync.mockReturnValue(false);
    const result = checkNpmContext();   
    expect(result.join(os.EOL)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,false
        - is @telicent-oss/telicent-frontend-cli:,false,
        - has tefe installed:,
        - has ./tefe.config.json:,{}"
    `);
  });
});
