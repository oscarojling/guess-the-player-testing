import { fireEvent, render, screen } from "@testing-library/react";
import Game from "./";
import { players } from "@/data/players";

describe("tests that checks the functionality of the game", () => {
  test("Show only start button before game starts", () => {
    render(<Game />);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.queryByText(/Player 1 of /i)).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("Show the game when clicking on start button", () => {
    render(<Game />);
    expect(screen.queryByText(/Player 1 of/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.getByText(/Player 1 of/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Start" }),
    ).not.toBeInTheDocument();
  });

  test("Show player name and show next button when revealed is click", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.queryByText(players[0].name)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText(players[0].name)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Reveal" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  test("Previous button does not show on first player", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(screen.getByText(/Player 1 of/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Previous" }),
    ).not.toBeInTheDocument();
  });
  test("Previous button returns previous player", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText(/Player 2 of/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByText(/Player 1 of/i)).toBeInTheDocument();
  });

  test("See next player when the next button is clicked", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText(/Player 1 of/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText(/Player 2 of/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
  });

  test("Previous button is shown after clicking next", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText(/Player 2 of/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous" }),
    ).toBeInTheDocument();
  });

  test("Complete the game after clicking through each player", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    players.forEach(() => {
      fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
    });
    expect(screen.getByRole("button", { name: "Restart" })).toBeInTheDocument();
    expect(screen.queryByText(/Player/i)).not.toBeInTheDocument();
  });

  test("Restarts the game", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    players.forEach(() => {
      fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
    });
    expect(screen.queryByText(/Player 1 of/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(screen.getByText(/Player 1 of/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reveal" })).toBeInTheDocument();
  });

  test("Restart button does not appear until finished with game", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(
      screen.queryByRole("button", { name: "Restart" }),
    ).not.toBeInTheDocument();
  });

  test("Shows all players at the end of the game", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    players.forEach(() => {
      fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
      fireEvent.click(screen.getByRole("button", { name: "Next" }));
    });
    const images = screen.getAllByRole("img");
    expect(images.length).toEqual(players.length);
  });
});
