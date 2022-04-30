import { UsersPayloadT } from "../../types/user";
import axios, { AxiosResponse } from 'axios'

type FetchUsers = {
    fetchUsers: (query: string) => Promise<AxiosResponse<UsersPayloadT>>;
};

const SEARCH_BASE_URL = 'https://api.github.com/search/users?'

function useFetchUsers(): FetchUsers {
    const fetchUsers = (query: string) => {
        const fetchUsersCall = axios.get(`${SEARCH_BASE_URL}q=${query}%20in:login`)
        return fetchUsersCall
    }

    return { fetchUsers }
}

export { useFetchUsers };
