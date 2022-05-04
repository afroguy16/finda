import { UsersPayloadT, UserT } from "../../types/user";
import { SortByE, SortTypeE } from "../enums/Sort";
import { UsersActionsE } from "../enums/users-actions";
import { SortByT } from "../types/SortUsers";
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
  switch (type) {
    case UsersActionsE.UPDATE_USERS:
      return {
        ...state,
        ...(payload as UsersPayloadT),
      };
    case UsersActionsE.SORT_USERS:
      // In case we need to sort by something else
      if ((payload as SortByT).name === SortByE.LOGIN) {
        if ((payload as SortByT).type === SortTypeE.ASC) {
          return {
            ...state,
            items: [...sortUsersByAsc(state.items)],
          };
        }
        return {
          ...state,
          items: [...sortUsersByDes(state.items)],
        };
      } else {
        return { ...state };
      }
    default:
      throw new Error(`No case for ${type} found in usersReducer`); //developers error to help them avoid bugs by not attempting to use an action that doesn't exist
  }
};

export default usersReducer;

const sortUsersByAsc = (users: UserT[]): UserT[] => {
  return users.sort((x, y) => {
    const transformCaseX = x.login.toLowerCase();
    const transformCaseY = y.login.toLowerCase();

    if (transformCaseX < transformCaseY) {
      return - 1;
    }

    if (transformCaseX > transformCaseY) {
      return 1;
    }

    return 0;
  });
};

const sortUsersByDes = (users: UserT[]): UserT[] => {
  return users.sort((x, y) => {
    const transformCaseX = x.login.toLowerCase();
    const transformCaseY = y.login.toLowerCase();

    if (transformCaseX > transformCaseY) {
      return - 1;
    }

    if (transformCaseX < transformCaseY) {
      return 1;
    }

    return 0;
  });
};