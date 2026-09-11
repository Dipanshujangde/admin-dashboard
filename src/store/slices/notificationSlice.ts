import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface NotificationState {
  items: Notification[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notify: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.items.push(action.payload);
      },
      prepare: (message: string, type: Notification['type'] = 'info') => ({
        payload: {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          type,
          message,
        },
      }),
    },
    dismiss: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
});

export const { notify, dismiss } = notificationSlice.actions;
export default notificationSlice.reducer;
