import { describe, expect, it } from "vitest";
import { getAPIKey } from "../api/auth.ts";

describe("getAPIKey", () => {
  it("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  it("returns the API key when valid 'ApiKey ' header is provided", () => {
    const headers = { authorization: "ApiKey secret-12345" };
    expect(getAPIKey(headers)).toBe("secret-12345");
  });

  it("returns null when scheme is not 'ApiKey'", () => {
    const headers = { authorization: "Bearer secret-12345" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when header is missing key part", () => {
    const headers = { authorization: "ApiKey" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("handles lowercase authorization header gracefully", () => {
    // Node HTTP headers normalize key names to lower-case
    const headers = { authorization: "ApiKey my-token" };
    expect(getAPIKey(headers)).toBe("my-token");
  });
});