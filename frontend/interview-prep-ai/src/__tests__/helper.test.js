// frontend/interview-prep-ai/src/__tests__/helper.test.js
import { describe, it, expect } from "vitest";
import { validateEmail, getInitials } from "../utils/helper";

describe("Helper Functions", () => {
  it("validateEmail should return true for valid emails", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("hello123@gmail.com")).toBe(true);
  });

  it("validateEmail should return false for invalid emails", () => {
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("@gmail.com")).toBe(false);
    expect(validateEmail("abc@")).toBe(false);
  });

  it("getInitials should return correct initials", () => {
    expect(getInitials("John Doe")).toBe("JD");
    expect(getInitials("Amanpreet Singh")).toBe("AS");
    expect(getInitials("Harsimar")).toBe("H"); // only one word
  });

  it("getInitials should return empty string for empty value", () => {
    expect(getInitials("")).toBe("");
    expect(getInitials(null)).toBe("");
    expect(getInitials(undefined)).toBe("");
  });
});
