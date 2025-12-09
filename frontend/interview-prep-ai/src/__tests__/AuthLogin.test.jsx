/** @vitest-environment jsdom */
// frontend/interview-prep-ai/src/__tests__/AuthLogin.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest"; // <-- expect added here

// IMPORTANT: paths are relative to this test file (src/__tests__)
// Adjust only if your project structure is different.
import Login from "../pages/Auth/Login";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { UserContext } from "../context/userContext";

// Mock axiosInstance module (we control its .post)
vi.mock("../utils/axiosInstance", () => {
  return {
    default: {
      post: vi.fn(),
    },
  };
});

// Mock react-router-dom's useNavigate so navigate() doesn't try to change pages during test
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  // keep other react-router-dom exports if needed; but we only need useNavigate
  return {
    useNavigate: () => mockNavigate,
  };
});

describe("Login component integrated test", () => {
  const mockUpdateUser = vi.fn();

  beforeEach(() => {
    // reset mocks before each test so calls don't leak across tests
    axiosInstance.post.mockReset();
    mockNavigate.mockReset();
    mockUpdateUser.mockReset();
  });

  it("should validate inputs, call login API, store token & call updateUser and navigate", async () => {
    // Arrange: mock API response similar to your actual backend
    axiosInstance.post.mockResolvedValue({
      data: { token: "fake-token", user: { name: "Test User", email: "a@b.com" } },
    });

    // Render Login with UserContext provider (so updateUser is available)
    render(
      <UserContext.Provider value={{ updateUser: mockUpdateUser }}>
        <Login setCurrentPage={() => {}} />
      </UserContext.Provider>
    );

    // Find inputs: your Login uses label="Email Address" and placeholder "john@example.com"
    // We first try to find by label, otherwise fallback to placeholder.
    const emailInput =
      screen.queryByLabelText(/Email Address/i) || screen.queryByPlaceholderText(/john@example.com/i);
    const passwordInput =
      screen.queryByLabelText(/Password/i) || screen.queryByPlaceholderText(/Min 8 Characters/i);

    if (!emailInput) {
      throw new Error(
        'Test error: could not find email input. Make sure your Input component renders a label "Email Address" or a placeholder "john@example.com".'
      );
    }
    if (!passwordInput) {
      throw new Error(
        'Test error: could not find password input. Make sure your Input component renders a label "Password" or a placeholder "Min 8 Characters".'
      );
    }

    // Type valid email & password
    fireEvent.change(emailInput, { target: { value: "a@b.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Click LOGIN button (text is "LOGIN" in your component)
    const submitBtn = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitBtn);

    // Wait for axiosInstance.post to be called (avoid using expect inside waitFor callback)
    await waitFor(() => {
      if (axiosInstance.post.mock.calls.length === 0) {
        // throws -> waitFor will retry until timeout
        throw new Error("axios.post not called yet");
      }
      return true;
    });

    // Check axios.post was called with the same API path your code uses
    expect(axiosInstance.post).toHaveBeenCalledWith(
      API_PATHS.AUTH.LOGIN,
      expect.objectContaining({ email: "a@b.com", password: "password123" })
    );

    // After a successful login, your code stores token and calls updateUser and navigate
    await waitFor(() => {
      if (!mockUpdateUser.mock.calls.length || !mockNavigate.mock.calls.length) {
        throw new Error("post-login actions not called yet");
      }
      return true;
    });

    expect(mockUpdateUser).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
