import { ReactNode } from "react";
import styles from "./message-bar.module.scss";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const MessageBar = ({ children, onClose }: Props) => {
  return (
    <>
      <div>
        <button
          className={styles.button}
          data-testid="close-button"
          onClick={() => onClose()}
        ></button>
      </div>
      <div>{children}</div>
    </>
  );
};

export default MessageBar;
