import { AxiosError } from "axios";
import { useState } from "react";

import Search from "../../components/search";
import Pagination from "../../components/pagination";
import { useFetchUsers } from "../../hooks/fetch-users";
import UserList from "../../layouts/user-list";
import useUsers from "../../store/context/UsersContext";
import styles from "./home.module.scss";
import MessageBar from "../../components/message-bar";
import TextButton from "../../components/text-button";

const SEARCH_PLACEHOLDER = "Enter a username to start searching...";
const DEFAULT_PAGE_NUMBER = "1";
const PAGE_RANGE = 5;
const GITHUB_SEARCH_RESULT_ALLOWED = 1000;
const USER_PAGE_DISPLAY = 9; //according to the assignment doc
const CUSTOM_ERROR_MESSAGE = "Something went wrong";

const Home = () => {
  const { fetchUsers } = useFetchUsers();
  const { items: users, total_count } = useUsers();
  const [initSearch, setInitSearch] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isSortedByAsc, setIsSortedByAsc] = useState(true);

  const hasUsers = () => users.length > 0;

  const getAvailablePageRange = (): number => {
    return total_count < GITHUB_SEARCH_RESULT_ALLOWED
      ? total_count
      : GITHUB_SEARCH_RESULT_ALLOWED;
  };

  const onFetchUsers = async (newQuery?: string, pageNumber?: string) => {
    setError("");
    if (!query && !newQuery) return;

    newQuery && setQuery(newQuery);
    setFetchingUsers(true);

    try {
      const pageNumberToSend = pageNumber ? pageNumber : DEFAULT_PAGE_NUMBER;
      const queryToSend = newQuery ? newQuery : query;

      await fetchUsers(queryToSend, pageNumberToSend);
      !initSearch && setInitSearch(true);
    } catch (e) {
      const err = e as AxiosError;
      if (err.message) {
        setError(err.message);
      } else {
        setError(CUSTOM_ERROR_MESSAGE);
      }
    } finally {
      setFetchingUsers(false);
    }
  };

  const onSortUsers = () => setIsSortedByAsc((oldValue) => !oldValue);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.search}>
          <Search
            placeholder={SEARCH_PLACEHOLDER}
            onChange={(query) => onFetchUsers(query)}
            loading={fetchingUsers}
          />
        </div>
        {hasUsers() && (
          <div className={styles.users_found}>
            <div className={styles.count}>
              <p data-testid="total_count">{total_count} users found</p>
              <TextButton text="Sort by login" onClick={onSortUsers} />
            </div>
            <div className={styles.user_list}>
              <UserList users={isSortedByAsc ? users : [...users].reverse()} />
            </div>
            <div className={styles.pagination}>
              {total_count > USER_PAGE_DISPLAY && (
                <Pagination
                  pageCount={Math.round(
                    getAvailablePageRange() / USER_PAGE_DISPLAY
                  )}
                  pageRangeDisplayed={PAGE_RANGE}
                  onSelectPage={(pageNumber) =>
                    onFetchUsers(undefined, pageNumber.toString())
                  }
                />
              )}
            </div>
          </div>
        )}
        {!hasUsers() && initSearch && (
          <div className={styles.no_user_list}>
            <p>No user found, please try another search 😞</p>
          </div>
        )}
      </div>
      {error ? (
        <MessageBar onClose={() => setError("")}>
          <p>{error}</p>
        </MessageBar>
      ) : null}
    </>
  );
};

export default Home;
