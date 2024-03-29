import {
  render,
  cleanup,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import Home from ".";
import { usersResponse, sortedByDecendingUsersResponse } from "../../mocks/users-response";
import { UsersProvider } from "../../store/context/UsersContext";

jest.mock("axios");

describe("User", () => {
  let baseElement: HTMLElement;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  afterEach(cleanup);

  beforeEach(() => {
    jest.useFakeTimers();
    
    const utils = render(
      <UsersProvider>
        <Home />
      </UsersProvider>
    );
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render a welcome text and search box", () => {
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeTruthy();
  });

  it("should display a list of users if login is search and a positive response is received", async () => {
    mockedAxios.get.mockResolvedValue({ data: usersResponse });

    const searchBox = screen.getByRole("textbox");
    const fakeValue = "bbc";

    act(() => {
      fireEvent.change(searchBox, { target: { value: fakeValue } });
      jest.advanceTimersByTime(500);
    })

    await waitFor(() => expect(screen.getAllByRole("list")).toBeTruthy());
  });

  it("should display the number of users found", async () => {
    mockedAxios.get.mockResolvedValue({ data: usersResponse });

    const searchBox = screen.getByRole("textbox");
    const fakeValue = "bbc";
    const { total_count } = usersResponse;

    act(() => {
      fireEvent.change(searchBox, { target: { value: fakeValue } });
      jest.advanceTimersByTime(500);
    })

    await waitFor(() => {
      const countElement = screen.getByTestId("total_count");
      expect(countElement.innerHTML).toContain(total_count.toString());
    });
  });

  it("should display a list of sorted users by descending if the sorted button has been clicked and the user was sorted by ascending", async () => {
    mockedAxios.get.mockResolvedValue({ data: sortedByDecendingUsersResponse });

    const searchBox = screen.getByRole("textbox");
    const fakeValue = "bbc";

    act(() => {
      fireEvent.change(searchBox, { target: { value: fakeValue } });
      jest.advanceTimersByTime(500);
    })

    await waitFor(() => {
      const lastItemIndex = usersResponse.items.length-1;
      const sorted = screen.getByTestId("sort-button");

      // Easy to test everything, since there are only 4 items in the mocked array
      const firstListItemName = screen.getAllByRole('listitem')[0].querySelector('p')?.innerHTML
      const secondListItemName = screen.getAllByRole('listitem')[1].querySelector('p')?.innerHTML
      const thirdListItemName = screen.getAllByRole('listitem')[2].querySelector('p')?.innerHTML
      const lastListItemName = screen.getAllByRole('listitem')[lastItemIndex].querySelector('p')?.innerHTML
      const usersResponseItems = [...usersResponse.items]

      fireEvent.click(sorted)

      expect(firstListItemName).toContain(`@${usersResponseItems[0].login}`)
      expect(secondListItemName).toContain(`@${usersResponseItems[1].login}`)
      expect(thirdListItemName).toContain(`@${usersResponseItems[2].login}`)
      expect(lastListItemName).toContain(`@${usersResponseItems[lastItemIndex].login}`)
    });
  });
});
