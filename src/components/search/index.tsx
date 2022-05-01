import { useEffect } from "react"
import { debounceTime, distinctUntilChanged, Subject } from "rxjs"

import styles from './search.module.scss'

type Props = {
  onChange: (newValue: string) => void;
  placeholder?: string;
};

const DELAY_INPUT_CHANGE = 500;

const Search = ({ onChange, placeholder }: Props) => {
  const searchValue$: Subject<string> = new Subject();

  useEffect(() => {
    subscribeToSearchValueChange(); //unsubscribing not need since it won't emit new event if there is no value changes
  }, []);

  const subscribeToSearchValueChange = () => {
    searchValue$
      .asObservable()
      .pipe(debounceTime(DELAY_INPUT_CHANGE), distinctUntilChanged())
      .subscribe((value) => {
        value && onChange(value);
      });
  };

  const emitNewSearchValue = (newValue: string) => {
    searchValue$.next(newValue);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.wrapper}
      onChange={(e) => emitNewSearchValue(e.target.value)}
    />
  );
};

export default Search;
