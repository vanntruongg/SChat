import { createAction } from '@reduxjs/toolkit';

export const receiveNotification = createAction('RECEIVE_NOTIFICATION', (notification: string) => {
  return {
    payload: notification,
  };
});
