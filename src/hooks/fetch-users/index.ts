import { UsersPayloadT } from "../../types/user";
import axios from 'axios'

type FetchUsers = {
    fetchUsers: (query: string) => Promise<boolean>;
};

const SEARCH_BASE_URL = 'https://api.github.com/search/users?'

function useFetchUsers(): FetchUsers {
    const fetchUsers = (query: string) => {
        const fetchUsersCall = axios.get(`${SEARCH_BASE_URL}q=${query}%20in:login`)
        return new Promise<boolean>(async(resolve, reject) => {
            try {
                const results = await fetchUsersCall
                resolve(true)
            } catch (e) {
                reject(e)
            }
        })
    }

    return { fetchUsers }
}

export { useFetchUsers };
