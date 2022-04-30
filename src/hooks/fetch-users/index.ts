import { UsersPayloadT } from "../../types/user";

type FetchUsers = {
    fetchUsers: (query: string) => Promise<unknown>;
};

const SEARCH_BASE_URL = 'https://api.github.com/search/users?'

function useFetchUsers(): FetchUsers {
    const fetchUsers = (query: string) => {
        const fetchUsersCall = fetch(`${SEARCH_BASE_URL}q=${query}%20in:login`)
        return fetchUsersCall
    }

    return { fetchUsers }
}

export { useFetchUsers };
