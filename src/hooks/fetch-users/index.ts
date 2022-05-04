import axios from "axios";
import useUsers from "../../store/context/UsersContext";
import { SortByT } from "../../store/types/SortUsers";

type FetchUsers = {
  fetchUsers: (query: string, pageNumber: string, sortBy?: SortByT) => Promise<boolean>;
};

const SEARCH_BASE_URL = "https://api.github.com/search/users?";
const DEFAULT_PAGE = 1

function useFetchUsers(): FetchUsers {
  const { updateUsers } = useUsers();

  const fetchUsers = (query: string, page?: string, sortBy?: SortByT) => {
    const pageNumber = !page ? DEFAULT_PAGE : page
    const fetchUsersCall = axios.get(`${SEARCH_BASE_URL}q=${query}%20in:login&per_page=9&page=${pageNumber}`);
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const results = (await fetchUsersCall).data;
        if(sortBy) {
          updateUsers(results);
        } else {
          updateUsers(results);
        }
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  return { fetchUsers };
}

export { useFetchUsers };
