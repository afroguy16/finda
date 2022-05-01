import axios from "axios";
import useUsers from "../../store/context/UsersContext";

type FetchUsers = {
  fetchUsers: (query: string) => Promise<boolean>;
};

const SEARCH_BASE_URL = "https://api.github.com/search/users?";

function useFetchUsers(): FetchUsers {
  const { updateUsers } = useUsers();

  const fetchUsers = (query: string) => {
    const fetchUsersCall = axios.get(`${SEARCH_BASE_URL}q=${query}%20in:login`);
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
