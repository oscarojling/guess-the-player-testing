import { render, screen } from "@testing-library/react";
import Header from "./";

describe("Test header functionality", () => {
  test("That there is only one H1 on the page", () => {
    render(<Header />);

    const pageTitle = screen.getByRole("heading", { level: 1 });

    expect(pageTitle).toBeInTheDocument();
  });

  test("That the header renders with an H1 and specific text", () => {
    render(<Header />);

    const pageTitle = screen.getByRole("heading", {
      level: 1,
      name: /guess the player/i,
    });

    expect(pageTitle).toBeInTheDocument();
  });

  test("the subtitle renders correceclty", () => {
    render(<Header />);

    const pageTitle = screen.getByRole("heading", {
      level: 2,
      name: /sweden world cup 2026/i,
    });

    expect(pageTitle).toHaveTextContent(/sweden world cup 2026/i);
  });
});
