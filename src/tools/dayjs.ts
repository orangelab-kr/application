import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

const instance = dayjs;

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(duration);

export const djs = instance;
