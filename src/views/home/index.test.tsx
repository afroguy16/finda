import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Home from ".";

describe("User", () => {
  let baseElement: HTMLElement;

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(<Home />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render a welcome text and search box", () => {
    const searchBox = (screen.getByRole('textbox'))
    expect(searchBox).toBeTruthy();
  });

  it("should display a list of users if login is search and a positive response is received", () => {
    const searchBox = (screen.getByRole('textbox'))
    const fakeValue = 'bbc'
    fireEvent.change(searchBox, {target: {value: fakeValue}})

    expect(screen.getByRole('list')).toBeTruthy()
  });
});
