import { UsersPayloadT } from "../../types/user";
import { UsersActionsE } from "../enums/users-actions";

export type UsersActionsT = {
    type: UsersActionsE,
    payload: UsersPayloadT
}