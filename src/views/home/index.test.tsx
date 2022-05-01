import { render, cleanup, screen, fireEvent,waitFor } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import Home from ".";
import { usersResponse } from "../../mocks/users-response";
import { UsersProvider } from "../../store/context/UsersContext";

jest.useFakeTimers();

jest.mock("axios")

describe("User", () => {
  let baseElement: HTMLElement;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(<UsersProvider><Home /></UsersProvider>);
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render a welcome text and search box", () => {
    const searchBox = (screen.getByRole('textbox'))
    expect(searchBox).toBeTruthy();
  });

  it("should display a list of users if login is search and a positive response is received", async () => {
    mockedAxios.get.mockResolvedValue({data: usersResponse});

    const searchBox = (screen.getByRole('textbox'))
    const fakeValue = 'bbc'
    
    act(() => {
      fireEvent.change(searchBox, {target: {value: fakeValue}})
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => expect(screen.getByRole('list')).toBeTruthy())
  });
});
