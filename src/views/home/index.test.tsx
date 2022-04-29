import { render, cleanup } from "@testing-library/react";
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
});
