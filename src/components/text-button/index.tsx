import styles from "./text-button.module.scss";

type Props = {
  text: string;
  onClick: () => void;
};

const TextButton = ({ text, onClick }: Props) => {
  return (
    <div className={styles.wrapper}>
      <button data-testid="sort-button" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default TextButton;
