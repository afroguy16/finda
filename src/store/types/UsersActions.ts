import { UsersPayloadT, UserT } from "../../types/user";
import { UsersActionsE } from "../enums/users-actions";
import { SortByT } from "./SortUsers";

export type UsersActionsT = {
    type: UsersActionsE,
    payload: UsersPayloadT | SortByT
}

export type UsersContextT = {
    total_count: number;
    items: UserT[];
    incomplete_results: boolean;
    updateUsers: (users: UsersPayloadT, sortBy?: SortByT) => void;
    sortUsers: (users: SortByT) => void;
}