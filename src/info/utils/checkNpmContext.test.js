import fs from "fs";
import os from "os";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import checkNpmContext, { TEFE_CONFIG } from "./checkNpmContext";
import * as getTefeJsonModule from "../../utils/tefe.config.json.utils";
import * as readJsonAtInvokedModule from "../../utils/readJsonAtInvoked";

const printResult = (arr) => arr.map((list) => list.join(" ")).join(os.EOL);

const getTefeJsonSpy = vi.spyOn(
  getTefeJsonModule,
  "getTefeJson"
);

const readJsonAtInvokedSpy = vi.spyOn(
  readJsonAtInvokedModule,
  "readJsonAtInvoked"
)

vi.mock("fs");
vi.mock("../../utils/readJsonAtInvoked", () => ({
  readJsonAtInvoked: vi.fn((modulePath) => {
    if (modulePath.endsWith("package.json")) {
      return { name: "TEFE", version: "123.345.456-test" };
    } else if (modulePath.includes(TEFE_CONFIG)) {
      return { version: "0.0.1-alpha"};
    } else {
      throw new Error(`Module not found in ${modulePath}`);
    }
  }),
}));
vi.mock("../../utils/formatJsonFile", () => ({ default: vi.fn(() => "{ version: \"0.0.1-formatted\"}") }));
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
    getTefeJsonSpy.mockReturnValueOnce(false);
    const result = checkNpmContext();
    expect(printResult(result)).toMatchInlineSnapshot(`
      "process.cwd(): /mocked/path
      Current dir: 
        - is npm package: true
        - is @telicent-oss/telicent-frontend-cli: false  (TEFE@123.345.456-test)
        - has tefe installed: false
        - has ./tefe.config.json: false"
    `);
  });
  it("handles being inside an npm package with TEFE_CONFIG file", () => {
    fs.existsSync.mockReturnValue(true);
    getTefeJsonSpy.mockReturnValueOnce(true);
    const result = checkNpmContext();
    expect(printResult(result)).toMatchInlineSnapshot(`
      "process.cwd(): /mocked/path
      Current dir: 
        - is npm package: true
        - is @telicent-oss/telicent-frontend-cli: false  (TEFE@123.345.456-test)
        - has tefe installed: false
        - has ./tefe.config.json: { version: "0.0.1-formatted"}"
    `);
  });

  it("detects the TEFE package correctly", () => {
    readJsonAtInvokedSpy.mockImplementationOnce(
      vi.fn(() => ({
        name: "@telicent-oss/telicent-frontend-cli",
        version: "1.2.3-test",
      }))
    );
    fs.existsSync.mockReturnValue(true);
    expect(printResult(checkNpmContext())).toMatchInlineSnapshot(`
      "process.cwd(): /mocked/path
      Current dir: 
        - is npm package: true
        - is @telicent-oss/telicent-frontend-cli: true  (@telicent-oss/telicent-frontend-cli@1.2.3-test)
        - has tefe installed: false
        - has ./tefe.config.json: false"
    `);
  });

  it("handles not being in an npm package", () => {
    fs.existsSync.mockReturnValue(false);
    getTefeJsonSpy.mockReturnValueOnce(false);
    const result = checkNpmContext();
    expect(printResult(result)).toMatchInlineSnapshot(`
      "process.cwd(): /mocked/path
      Current dir: 
        - is npm package: false
        - is @telicent-oss/telicent-frontend-cli:  
        - has tefe installed: false
        - has ./tefe.config.json: false"
    `);
  });
});
