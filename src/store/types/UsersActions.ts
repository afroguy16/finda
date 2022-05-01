import { UsersPayloadT, UserT } from "../../types/user";
import { UsersActionsE } from "../enums/users-actions";

export type UsersActionsT = {
    type: UsersActionsE,
    payload: UsersPayloadT
}

export type UsersContextT = {
    total_count: number;
    items: UserT[];
    incomplete_results: boolean;
    updateUsers: (users: UsersPayloadT) => void;
}