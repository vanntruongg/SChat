import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import notificationReducer from './notificationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});

const persitConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'notification'],
};

const persistedReducer = persistReducer(persitConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
