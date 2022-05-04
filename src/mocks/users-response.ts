import { UsersPayloadT } from "../types/user";
import { sortedByDecending, users } from "./users";

export const usersResponse: UsersPayloadT = {
  total_count: 4,
  incomplete_results: false,
  items: [...users],
};

export const sortedByDecendingUsersResponse: UsersPayloadT = {
  total_count: 4,
  incomplete_results: false,
  items: [...sortedByDecending],
};
