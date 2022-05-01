import { AxiosError } from "axios";
import { useState } from "react";
import Search from "../../components/search";
import { useFetchUsers } from "../../hooks/fetch-users";
import UserList from "../../layouts/user-list";
import useUsers from "../../store/context/UsersContext";
import styles from "./home.module.scss";

const SEARCH_PLACEHOLDER = "Enter a username to start searching...";

const Home = () => {
  const { fetchUsers } = useFetchUsers();
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const { items: users } = useUsers();
  const [initSearch, setInitSearch] = useState(false)

  const onFetchUsers = async (query: string) => {
    console.log(query, fetchingUsers);
    setFetchingUsers(true);
    try {
      const usersResult = await fetchUsers(query);
      console.log(usersResult);
      !initSearch && setInitSearch(true)
    } catch (e) {
      const err = e as AxiosError;
      if (err.message) {
        console.log(err.message);
      } else {
        console.log("something went wrong");
      }
    } finally {
      setFetchingUsers(false);
    }
  };

  const hasUsers = () => users.length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search
          placeholder={SEARCH_PLACEHOLDER}
          onChange={(query) => onFetchUsers(query)}
          loading={fetchingUsers}
        />
      </div>
      {hasUsers() && (
        <div className={styles.user_list}>
          <UserList users={users} />
        </div>
      )}
      {!hasUsers() && initSearch && (
        <div className={styles.user_list}>
          <p>No user found, please try another search</p>
        </div>
      )}
    </div>
  );
};

export default Home;
