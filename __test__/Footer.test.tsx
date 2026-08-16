import { render, screen } from "@testing-library/react";
import Footer from "./";

describe("Test footer functionality", () => {
  test("Displays the expected text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/guess the player game by oscar/i),
    ).toBeInTheDocument();
  });
});
