import { useEffect } from "react";
import Search from "../../components/search";
import styles from "./home.module.scss";

const SEARCH_PLACEHOLDER = "Enter a username to start searching...";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Search
          placeholder={SEARCH_PLACEHOLDER}
          onChange={(e) => console.log(e)}
        />
      </div>
      <div className={styles.user_list}></div>
    </div>
  );
};

export default Home;
