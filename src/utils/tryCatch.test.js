import { describe, it, expect } from "vitest";
import tryCatch from "./tryCatch.js"; // Adjust the import path

describe("tryCatch function", () => {
  it("returns success value on successful work function", () => {
    const success = "Success";
    const result = tryCatch(() => {}, success, "Failure");
    expect(result).toBe(success);
  });

  it("returns failure value when work function throws", () => {
    const failure = "Failure";
    const result = tryCatch(
      () => {
        throw new Error("Error");
      },
      "Success",
      failure
    );
    expect(result).toBe(failure);
  });
});
