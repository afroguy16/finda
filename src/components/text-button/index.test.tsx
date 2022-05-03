import { render, cleanup, screen } from "@testing-library/react";
import TextButton from ".";

describe("TextButton", () => {
  let baseElement: HTMLElement;
  let mockOnClickCallBack: jest.Mock<any, any>;
  const fakeButtonText = "Click me"

  afterEach(cleanup);

  beforeEach(() => {
    mockOnClickCallBack = jest.fn()
    const utils = render(<TextButton text={fakeButtonText} onClick={() => mockOnClickCallBack()} />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("button text should be the same with the text props passed", () => {
    const closeButton = screen.getByRole("button"); 

    expect(closeButton.innerHTML).toBe(fakeButtonText);
  });

  it("should call onClickCallback when button is clicked", () => {
    const closeButton = screen.getByRole("button");

    closeButton.click()

    expect(mockOnClickCallBack).toHaveBeenCalled();
  });
});
