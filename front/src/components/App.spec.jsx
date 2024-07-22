import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("./SignIn", () => ({ SignIn: () => <div>Sign In</div> }));
jest.mock("./Profile", () => ({ Profile: () => <div>Profile</div> }));

describe("App", () => {
  it("renders correctly", () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch("SignIn");
  });

  describe("when clicked on navigation buttons", () => {
    it("opens the corresponding page", () => {
      const { getByText, container } = render(<App />);
      fireEvent.click(getByText('SignIn'));
      expect(container.innerHTML).toMatch("Sign In");
      fireEvent.click(getByText('Profile'));
      expect(container.innerHTML).toMatch("Profile");
    });
  });
});
