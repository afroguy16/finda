import { render, cleanup, screen } from "@testing-library/react";
import UserList from ".";
import { users } from "../../mocks/users";
import { UserT } from "../../types/user";

describe("User List", () => {
  let baseElement: HTMLElement;
  const fakeUsers: Array<UserT> = [ ...users ];

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(
      <UserList users={fakeUsers} />
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

// describe("User List without Users", () => {
//   let baseElement: HTMLElement;
//   const fakeUsers: Array<UserT> = [];

//   afterEach(cleanup);

//   beforeEach(() => {
//     const utils = render(
//       <UserList users={fakeUsers} />
//     );
//     baseElement = utils.baseElement;
//   });
// })
