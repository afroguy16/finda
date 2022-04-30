import { render, cleanup, screen } from "@testing-library/react";
import UserList from ".";
import { users } from "../../mocks/users";
import { UserT } from "../../types/user";

const FAKE_EMPTY_MESSAGE = 'Dummy fake message'

describe("User List", () => {
  let baseElement: HTMLElement;
  const fakeUsers: Array<UserT> = [ ...users ];

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(
      <UserList emptyMessage={FAKE_EMPTY_MESSAGE} users={fakeUsers} />
    );
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy()
  });

  it("should render a list of users that is passed through the props", () => {
    const userListElement = screen.getByRole("list");
    const userElement = screen.getAllByRole('listitem')

    expect(userListElement).toBeTruthy()
    expect(userElement).toHaveLength(fakeUsers.length)
  });
});

describe("User List without Users", () => {
  let baseElement: HTMLElement;
  const fakeUsers: Array<UserT> = [];

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(
      <UserList emptyMessage={FAKE_EMPTY_MESSAGE} users={fakeUsers} />
    );
    baseElement = utils.baseElement;
  });

  it("should render props message if there is no user in the lislt", () => {
    const errorMessage = screen.queryByText(FAKE_EMPTY_MESSAGE);

    expect(errorMessage).toBeTruthy();
  });
})
