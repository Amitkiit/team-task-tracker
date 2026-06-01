import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Tasks from "../pages/Tasks";

import { vi } from "vitest";

vi.mock("../services/task.service", () => ({
  getTasks: vi.fn().mockResolvedValue([]),
  createTask: vi.fn(),
  updateTaskStatus: vi.fn(),
  assignTask: vi.fn()
}));

vi.mock("../services/member.service", () => ({
  getMembers: vi.fn().mockResolvedValue([])
}));

describe("Tasks Page", () => {

  test("renders task page", async () => {

    render(
      <MemoryRouter>
        <Tasks />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(
        "Task Management"
      )
    ).toBeInTheDocument();

  });

});