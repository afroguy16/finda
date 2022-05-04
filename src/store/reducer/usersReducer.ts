import { UsersPayloadT } from "../../types/user";
import { UsersActionsE } from "../enums/users-actions";
import { UsersActionsT } from "../types/UsersActions";

export const initialState: UsersPayloadT = {
  total_count: 0,
  incomplete_results: false,
  items: [],
};

const usersReducer = (
  state: UsersPayloadT,
  { type, payload }: UsersActionsT
): UsersPayloadT => {
  if (type === UsersActionsE.UPDATE_USERS) {
    return {
      ...state,
      ...payload,
    };
  }
  throw new Error(`No case for ${type} found in usersReducer`); //developers error to help them avoid bugs by not attempting to use an action that doesn't exist
};

export default usersReducer;
