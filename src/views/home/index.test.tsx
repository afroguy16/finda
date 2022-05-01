import { render, cleanup, screen } from "@testing-library/react";
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
});
