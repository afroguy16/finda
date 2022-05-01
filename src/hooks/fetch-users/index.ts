import axios from "axios";
import useUsers from "../../store/context/UsersContext";

type FetchUsers = {
  fetchUsers: (query: string, pageNumber: string) => Promise<boolean>;
};

const SEARCH_BASE_URL = "https://api.github.com/search/users?";
const DEFAULT_PAGE = 1

function useFetchUsers(): FetchUsers {
  const { updateUsers } = useUsers();

  const fetchUsers = (query: string, page?: string) => {
    const pageNumber = !page ? DEFAULT_PAGE : page
    const fetchUsersCall = axios.get(`${SEARCH_BASE_URL}q=${query}%20in:login&per_page=9&page=${pageNumber}`);
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const results = (await fetchUsersCall).data;
        updateUsers(results);
        console.log(results)
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  };

  return { fetchUsers };
}

export { useFetchUsers };
