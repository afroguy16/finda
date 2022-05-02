import { render, cleanup, screen,fireEvent } from "@testing-library/react";
import Pagination from ".";

describe("Pagination", () => {
  let baseElement: HTMLElement;
  let mockOnSelectPageCallBack: jest.Mock<any, any>;
  const fakePageCount = 10;
  const fakePageRangeDisplayed = 10;

  afterEach(cleanup);

  beforeEach(() => {
    mockOnSelectPageCallBack = jest.fn();
    const utils = render(
      <Pagination
        pageCount={fakePageCount}
        pageRangeDisplayed={fakePageRangeDisplayed}
        onSelectPage={() => mockOnSelectPageCallBack()}
      />
    );
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });
});
