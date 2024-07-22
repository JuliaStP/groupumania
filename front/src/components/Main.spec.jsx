import React from "react";
import Main from "./Main";
import { render } from "@testing-library/react";

describe("Main", () => {
  it("renders correctly", () => {
    const { container } = render(<Main />);
    expect(container.innerHTML).toMatch("Main")
  });
});