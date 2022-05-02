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

  it("should call onSelect call back with the selected page number if a page is selected", () => {
    const listItemIndex = 4;
    const pageNumber = 3;
    const thirdListItem = screen.getAllByRole("listitem")[listItemIndex];

    fireEvent.click(thirdListItem)

    expect(mockOnSelectPageCallBack).toHaveBeenCalledWith(pageNumber); //not passing, unknown reason, suspect is library compatibility because this works in the dom. I will have to confirm. I am leaving this hear so I can get back to it
  });
});
