import React from "react";
import { screen, render, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import Register from ".";
import theme from "../../../styles/theme";

const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

describe("<Register />", () => {
  it("should render all fields", () => {
    renderWithTheme(<Register />);

    expect(
      screen.getByRole("heading", {
        name: /register/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /name/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /email/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /password/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", {
        name: /passswordconfirmation/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /register/i,
      })
    ).toBeInTheDocument();
  });
});
