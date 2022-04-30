import { useEffect } from "react";
import { debounceTime, Subject } from "rxjs";

type Props = {
  onChange: (newValue: string) => void;
};

const Search = ({ onChange }: Props) => {
  const changeHandler: Subject<string> = new Subject();

  useEffect(() => {
    changeHandler
      .asObservable()
      .pipe(
        debounceTime(500)
      )
      .subscribe((value) => {
        value && onChange(value);
      });
  });

  return (
    <div>
      <input type="text" onChange={(e) => changeHandler.next(e.target.value)} />
    </div>
  );
};

export default Search;
