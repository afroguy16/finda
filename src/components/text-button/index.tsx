import { MouseEventHandler, ReactNode } from "react";
import styles from "./message-bar.module.scss";

type Props = {
  text: string;
  onClick: () => void;
};

const TextButton = ({ text, onClick }: Props) => {
  return (
    <div className={styles.wrapper}>
      <button data-testid="close-button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default TextButton;
