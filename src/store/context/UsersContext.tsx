import { createContext, ReactNode, useContext, useReducer } from "react";
import { UsersPayloadT } from "../../types/user";
import { UsersActionsE } from "../enums/users-actions";
import usersReducer, { initialState } from "../reducer/usersReducer";
import { SortByT } from "../types/SortUsers";
import { UsersContextT } from "../types/UsersActions";

const UsersContext = createContext(initialState);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const updateUsers = (users: UsersPayloadT, sortBy: SortByT) => {
    dispatch({
      type: UsersActionsE.UPDATE_USERS,
      payload: users,
    });
    if(sortBy) {
      console.log(sortBy)
      sortUsers(sortBy)
    }
  };

  const sortUsers = (sortValue: SortByT) => {
    dispatch({
      type: UsersActionsE.SORT_USERS,
      payload: sortValue,
    });
  };

  const value = {
    total_count: state.total_count,
    items: state.items,
    incomplete_results: state.incomplete_results,
    updateUsers,
    sortUsers
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext) as UsersContextT;

  if (context === undefined) {
    throw new Error("useUsers must be used within UsersContext");
  }

  return context;
};

export default useUsers;
