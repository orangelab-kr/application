import {atom, selector} from 'recoil';
import {AccountsClient, AuthUser} from '../api/accounts';

export const resetLoginedUserState = atom({
  key: 'resetLoginedUser',
  default: false,
});

export const loginedUserState = selector<AuthUser | undefined | null>({
  key: 'logginedUser',
  get: async ({get}) => {
    try {
      get(resetLoginedUserState);
      const {user} = await AccountsClient.getUser();
      return user;
    } catch (err) {
      return null;
    }
  },
});
