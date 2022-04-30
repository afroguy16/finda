import { UsersPayloadT } from "../types/user";
import { users } from "./users";

export const usersResponse: UsersPayloadT = {
  total_count: 4,
  incomplete_results: false,
  items: [...users],
};
