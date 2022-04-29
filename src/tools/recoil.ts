import {RecoilValue, useRecoilValueLoadable} from 'recoil';

export const useRecoilValueMaybe = <T>(
  recoilValue: RecoilValue<T>,
): T | undefined => {
  const value = useRecoilValueLoadable(recoilValue);
  return value.valueMaybe();
};
