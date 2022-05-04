import styles from "./text-button.module.scss";

type Props = {
  text: string;
  onClick: () => void;
};

const TextButton = ({ text, onClick }: Props) => {
  return (
    <button
      className={styles.wrapper}
      data-testid="sort-button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default TextButton;
