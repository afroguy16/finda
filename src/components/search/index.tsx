import { useEffect } from "react";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";

type Props = {
  onChange: (newValue: string) => void;
};

const DELAY_INPUT_CHANGE = 500

const Search = ({ onChange }: Props) => {
  const searchValue$: Subject<string> = new Subject();

  useEffect(() => {
    subscribeToSearchValueChange();
    return () => {
      searchValue$.complete();
    };
  });

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
    <div>
      <input type="text" onChange={(e) => emitNewSearchValue(e.target.value)} />
    </div>
  );
};

export default Search;
