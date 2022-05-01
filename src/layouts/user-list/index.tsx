import User from "../../components/user";
import { UserT } from "../../types/user";
import styles from "./user-list.module.scss";

type Props = {
  users: UserT[];
};

const UserList = (props: Props) => {
  const { users } = props;

  const getUserElements = (users: Array<UserT>) =>
    users.map((user) => (
      <li key={user.id}>
        <User
          login={user.login}
          type={user.type}
          avatar_url={user.avatar_url}
        />
      </li>
    ));

  return (
      <ul className={styles.wrapper} data-testid="wrapper">
        {users && users.length > 0 && getUserElements(users)}
      </ul>
  );
};

export default UserList;
