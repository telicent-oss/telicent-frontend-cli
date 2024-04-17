import fs from "fs";
import os from "os";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import checkNpmContext, { TEFE } from "./checkNpmContext";
import { getTefeJson } from "../../utils/tefe.config.json.utils";
const { stringify } = JSON;

const printResult = (arr) => arr.map(list=>stringify(list)).join(os.EOL);

vi.mock("fs");
vi.mock("./readJson", () => ({ readJson: vi.fn().mockReturnValue((modulePath) => {
    if (modulePath.endsWith("package.json")) {
      // Mock the package.json contents
      return { name: TEFE, version: '123.345.456-test' };
    } else if (modulePath.includes(TEFE)) {
      // Handle TEFE specific path
      return {}; // Mock the expected output for TEFE related module
    } else {
      throw new Error(`Module not found in ${modulePath}`);
    }
  }),
  }),
);
vi.mock("../../utils/formatJsonFile", () => ({ default: vi.fn(() => '{}') }));
vi.mock("../../utils/tryCatch", () => ({ default: vi.fn() }));
vi.mock("../../utils/tefe.config.json.utils", () => ({
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
    expect(printResult(result)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,true
        - is @telicent-oss/telicent-frontend-cli:,true, (@telicent-oss/telicent-frontend-cli@123.345.456-test)
        - has tefe installed:,
        - has ./tefe.config.json:,false"
    `);
  });
  it("handles being inside an npm package with TEFE_CONFIG file", () => {
    fs.existsSync.mockReturnValue(true);
    getTefeJson.mockReturnValue(true);
    const result = checkNpmContext();
    expect(printResult(result)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,true
        - is @telicent-oss/telicent-frontend-cli:,true, (@telicent-oss/telicent-frontend-cli@123.345.456-test)
        - has tefe installed:,
        - has ./tefe.config.json:,{}"
    `);
  });

  it("detects the TEFE package correctly", () => {
    fs.existsSync.mockReturnValue(true);
    const result = checkNpmContext();
    expect(printResult(result)).toMatchInlineSnapshot(`
      "process.cwd():,/mocked/path
      Current dir:,
        - is npm package:,true
        - is @telicent-oss/telicent-frontend-cli:,true, (@telicent-oss/telicent-frontend-cli@123.345.456-test)
        - has tefe installed:,
        - has ./tefe.config.json:,{}"
    `);
  });

  it.only("handles not being in an npm package", () => {
    fs.existsSync.mockReturnValue(false);
    const result = checkNpmContext();   
    expect(printResult(result)).toMatchInlineSnapshot(`
      "["process.cwd():","/mocked/path"]
      ["Current dir:",""]
      ["  - is npm package:",false]
      ["  - is @telicent-oss/telicent-frontend-cli:",false,""]
      ["  - has tefe installed:",null]
      ["  - has ./tefe.config.json:",false]"
    `);
  });
});
