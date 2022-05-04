import { UsersPayloadT } from "../types/user";
import { unsortedUsers, users } from "./users";

export const usersResponse: UsersPayloadT = {
  total_count: 4,
  incomplete_results: false,
  items: [...users],
};

export const unsortedUserResponse: UsersPayloadT = {
  total_count: 4,
  incomplete_results: false,
  items: [...unsortedUsers],
};
