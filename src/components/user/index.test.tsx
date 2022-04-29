import { render, cleanup, screen } from "@testing-library/react";
import User from ".";
import { users } from "../../mocks/users";
import { UserT } from "../../types/user";

describe("User", () => {
  let baseElement: HTMLElement;
  const fakeUser: Omit<UserT, "id"> = { ...users[0] };

  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(
      <User
        login={fakeUser.login}
        avatar_url={fakeUser.avatar_url}
        type={fakeUser.type}
      />
    );
    baseElement = utils.baseElement;
  });

  it("should render successfully", () => {
    expect(baseElement).toBeTruthy();
  });

  it("should render with props details id, avatar_url and type", () => {
    const loginParagraph = screen.queryByText(fakeUser.login);
    const typeParagraph = screen.queryByText(fakeUser.type);
    const image = screen.getByRole("img");

    expect(loginParagraph).toBeTruthy();
    expect(typeParagraph).toBeTruthy();
    expect(image.getAttribute("src")).toBe(fakeUser.avatar_url);
    expect(image.getAttribute("alt")).toContain(fakeUser.login);
  });
});
