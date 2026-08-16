import { fireEvent, render, screen } from "@testing-library/react";
import Flashcard from "./";
import { PlayerType } from "@/types/player";

const FlashCardMock: PlayerType = {
  name: "Mock Player",
  image: "mock-image.jpg",
};

describe("Test flashcard functionality", () => {
  test("Do not show the players name and show the reveal button when it is false", () => {
    const mockFunction = jest.fn();
    render(
      <Flashcard
        player={FlashCardMock}
        isShown={false}
        onReveal={mockFunction}
      />,
    );
    const revealButton = screen.getByRole("button", { name: /reveal/i });
    expect(revealButton).toBeInTheDocument();
    expect(screen.queryByText(FlashCardMock.name)).not.toBeInTheDocument();
  });

  test("Show the players name and hide the reveal button when it is true", () => {
    const mockFunction = jest.fn();
    render(
      <Flashcard
        player={FlashCardMock}
        isShown={true}
        onReveal={mockFunction}
      />,
    );
    expect(screen.getByText(FlashCardMock.name)).toBeInTheDocument();
    const revealButton = screen.queryByRole("button", { name: /reveal/i });
    expect(revealButton).not.toBeInTheDocument();
  });

  test("Respond when user click the button, which triggers the reveal function", () => {
    const mockFunction = jest.fn();
    render(
      <Flashcard
        player={FlashCardMock}
        isShown={false}
        onReveal={mockFunction}
      />,
    );
    const revealButton = screen.getByRole("button", { name: /reveal/i });
    fireEvent.click(revealButton);
    expect(mockFunction).toHaveBeenCalled();
  });
});
