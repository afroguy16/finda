import ReactDOM from "react-dom";
import { ReactNode } from "react";
import styles from "./message-bar.module.scss";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const MessageBar = ({ children, onClose }: Props) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.wrapper}>
        <div className={styles.button}>
          <button
            data-testid="close-button"
            onClick={() => onClose()}
          >x</button>
        </div>
        <div>{children}</div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default MessageBar;
