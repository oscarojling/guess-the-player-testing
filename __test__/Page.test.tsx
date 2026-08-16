import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  test("Page renders header, game and footer", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: /guess the player/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(
      screen.getByText(/guess the player Game by oscar/i),
    ).toBeInTheDocument();
  });
});
