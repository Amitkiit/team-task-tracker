import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Login from "../pages/Login";

describe("Login Page", () => {

  test("renders login form", () => {

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();

  });

});