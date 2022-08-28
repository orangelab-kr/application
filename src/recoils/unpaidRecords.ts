import {AppState} from 'react-native';
import {atom} from 'recoil';
import {PaymentsClient, PaymentsRecord} from '../api/payments';

export const unpaidRecordsState = atom<PaymentsRecord[]>({
  key: 'unpaidRecords',
  default: [],
  effects: [
    ({setSelf}) => {
      const getRecords = async () => {
        if (AppState.currentState === 'background') return;
        const {records} = await PaymentsClient.getRecords({
          onlyUnpaid: true,
          take: 1000,
        });

        setSelf(records);
      };

      getRecords();
    },
  ],
});
