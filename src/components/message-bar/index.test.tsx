import { render, cleanup, screen } from "@testing-library/react";
import MessageBar from ".";

describe("MessageBar", () => {
  let baseElement: HTMLElement;
  let mockOnCloseCallBack: jest.Mock<any, any>;
  const fakeMessageBarChildElement = (
    <div>
      <p>Hello MessageBar</p>
      <p>Hell second paragraph</p>
    </div>
  );

  afterEach(cleanup);

  beforeEach(() => {
    const root = document.createElement('div');
    root.setAttribute("id", "portal");
    document.body.appendChild(root);
  })

  beforeEach(() => {
    mockOnCloseCallBack = jest.fn()
    const utils = render(<MessageBar onClose={() => mockOnCloseCallBack()}>{fakeMessageBarChildElement}</MessageBar>);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render children element", () => {
    const childElement = baseElement.querySelector(
      fakeMessageBarChildElement.type
    );

    expect(childElement).toBeInTheDocument();
  });

  it("should should close if close button is clicked", () => {
    const closeButton = screen.getByTestId("close-button");

    closeButton.click()

    expect(mockOnCloseCallBack).toHaveBeenCalled();
  });
});
