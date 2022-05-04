import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {RecoilState, useRecoilState} from 'recoil';
import {useDebounce} from 'use-debounce';

export const useRecoilValueDebounce = <T>(
  recoilState: RecoilState<T>,
  delay = 500,
  onChanged?: () => void,
): [T, Dispatch<SetStateAction<T>>] => {
  const [valueInStore, setValueInStore] = useRecoilState(recoilState);
  const [value, setValue] = useState<T>(valueInStore);
  const [debouncedValue] = useDebounce(value, delay);
  useEffect(() => {
    setValueInStore(debouncedValue);
    if (onChanged) onChanged();
  }, [debouncedValue, onChanged, setValueInStore]);

  useEffect(() => setValue(valueInStore), [valueInStore]);
  return [value, setValue];
};
