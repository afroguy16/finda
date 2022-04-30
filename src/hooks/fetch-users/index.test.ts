import { cleanup } from "@testing-library/react";
import axios from "axios";

import { useFetchUsers } from ".";
import { usersResponse } from "../../mocks/users-response";

jest.mock("axios")

describe("useFetchUsers", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(cleanup);

  // This test doesn't provide any real value.. it's just a demo of what a hook test could look like
  it("should return a Promise of UserResponseT if it receives a successful Response from call", async () => {
    const fakeResponse = await Promise.resolve(usersResponse)
    mockedAxios.get.mockResolvedValue(usersResponse);
    const { fetchUsers } = useFetchUsers();
    const mockedResponse = await fetchUsers("dummy query");
    expect(fakeResponse).toBe(mockedResponse);
  });
});
