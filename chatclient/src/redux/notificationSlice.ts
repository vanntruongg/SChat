import { createReducer } from '@reduxjs/toolkit';
import { receiveNotification } from './actions';

interface NotificationState {
  notifications: string[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createReducer(initialState, (builder) => {
  builder.addCase(receiveNotification, (state, action) => {
    state.notifications.push(action.payload);
  });
});

export default notificationSlice;
