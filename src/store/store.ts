import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import visitorReducer from './slices/visitorSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    visitors: visitorReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
