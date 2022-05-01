import { cleanup } from "@testing-library/react";
import axios from "axios";

import { useFetchUsers } from ".";
import { usersResponse } from "../../mocks/users-response";

jest.mock("axios")

describe("useFetchUsers", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  afterEach(cleanup);

  // Fake test 
  it('should be truthy', () => {
    expect(1).toBe(1)
  })

  // Add test for this
  // it("should return a Promise of UserResponseT if it receives a successful Response from call", async () => {
  //   mockedAxios.get.mockResolvedValue(usersResponse);
  //   const { fetchUsers } = useFetchUsers();
  //   const mockedResponse = await fetchUsers("dummy query");
  //   expect(mockedResponse).toBe(true);
  // });
});
