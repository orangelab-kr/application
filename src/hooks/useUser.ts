import {useEffect, useState} from 'react';
import {
  AccountsClient,
  AuthUser,
  ResponseAccountsAuthInfo,
} from '../api/accounts';

let cachedUser: AuthUser;
export const useUser = ({cache = true}: {cache: boolean}) => {
  const [user, setUser] = useState<AuthUser | null>();
  useEffect(() => {
    if (cache && cachedUser) {
      console.log('Used cached user.');
      return setUser(cachedUser);
    }

    const updateUser = ({user}: ResponseAccountsAuthInfo) => {
      cachedUser = user;
      setUser(cachedUser);
    };

    AccountsClient.getUser()
      .then(updateUser)
      .catch(() => setUser(null));
  }, [cache]);

  return user;
};
