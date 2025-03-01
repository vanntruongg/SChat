import dayjs from 'dayjs';

export const formatLongToTime = (timestamp: string): string => {
  const formatedTime = dayjs(timestamp).format('HH:mm');
  return formatedTime;
};
