import {selector} from 'recoil';
import {AccountsClient, AuthUser} from '../api/accounts';

export const loginedUserState = selector<AuthUser | undefined | null>({
  key: 'logginedUser',
  get: async () => {
    try {
      const {user} = await AccountsClient.getUser();
      return user;
    } catch (err) {
      return null;
    }
  },
});
