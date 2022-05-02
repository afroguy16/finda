import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Search from ".";

describe("Search", () => {
  let baseElement: HTMLElement;
  let mockOnChangeCallBack = jest.fn()
  
  jest.useFakeTimers();

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(<Search onChange={(e) => mockOnChangeCallBack(e)} />);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should trigger onChange after 500ms", () => {
    const fakeValue = 'bbc'
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: fakeValue}})

    expect(mockOnChangeCallBack).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500);

    expect(mockOnChangeCallBack).toHaveBeenCalledWith(fakeValue)
  });

  it("should not trigger onChange after 500ms if value is empty", () => {
    const fakeValue = ''
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: fakeValue}})

    jest.advanceTimersByTime(500);

    expect(mockOnChangeCallBack).not.toHaveBeenCalled()
  });

  it("should not trigger onChange after 500ms if the new value and the previous value is the same", () => {
    const fakeValue = 'bbc'
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {target: {value: fakeValue}})

    jest.advanceTimersByTime(500);
    expect(mockOnChangeCallBack).toHaveBeenCalledWith(fakeValue)

    fireEvent.change(input, {target: {value: fakeValue}})
    jest.advanceTimersByTime(500);

    expect(mockOnChangeCallBack).toHaveBeenCalledTimes(1) //working in the app. I need to find out this is failing in RTL
  });
});
