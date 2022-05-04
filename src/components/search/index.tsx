import { useEffect, useState } from "react";
import { debounceTime, distinctUntilChanged, takeWhile } from "rxjs";
import { createSignal } from "@react-rxjs/utils";

import styles from "./search.module.scss";

type Props = {
  onChange: (newValue: string) => void;
  placeholder?: string;
  loading?: boolean;
};

const DELAY_INPUT_CHANGE = 500;

const [searchValue$, setSearchValue] = createSignal<any>();

const Search = ({ onChange, placeholder, loading }: Props) => {
  const [alive, setAlive] = useState(true);

  useEffect(() => {
    const subscribeToSearchValueChange = () => {
      searchValue$
        .pipe(
          debounceTime(DELAY_INPUT_CHANGE),
          distinctUntilChanged(),
          takeWhile(() => alive)
        )
        .subscribe((value) => {
          value && onChange(value);
        });
    };

    subscribeToSearchValueChange();

    return () => setAlive(false);
  }, [alive, searchValue$]);

  const emitNewSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => emitNewSearchValue(e.target.value)}
      />
      {loading && <div className={styles.loader}></div>}
    </div>
  );
};

export default Search;
