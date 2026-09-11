import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { visitorApi } from '@/api/visitorApi';
import type { Visitor, VisitorFormValues, VisitorState } from '@/types/visitor';
import { notify } from './notificationSlice';

const initialState: VisitorState = {
  items: [],
  status: 'idle',
  error: null,
  actioningIds: [],
  isSubmitting: false,
};

function extractMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

// ---------- Thunks ----------

export const fetchVisitors = createAsyncThunk(
  'visitors/fetchAll',
  async (_: void, { dispatch, rejectWithValue }) => {
    try {
      return await visitorApi.getAll();
    } catch (err) {
      const message = extractMessage(err, 'Failed to load visitors.');
      dispatch(notify(message, 'error'));
      return rejectWithValue(message);
    }
  }
);

export const addVisitor = createAsyncThunk(
  'visitors/add',
  async (payload: VisitorFormValues, { dispatch, rejectWithValue }) => {
    try {
      const visitor = await visitorApi.create(payload);
      dispatch(notify(`${visitor.name} was added to the visitor list.`, 'success'));
      return visitor;
    } catch (err) {
      const message = extractMessage(err, 'Failed to add visitor.');
      dispatch(notify(message, 'error'));
      return rejectWithValue(message);
    }
  }
);

export const updateVisitor = createAsyncThunk(
  'visitors/update',
  async (
    { id, payload }: { id: string; payload: VisitorFormValues },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const visitor = await visitorApi.update(id, payload);
      dispatch(notify(`${visitor.name}'s details were updated.`, 'success'));
      return visitor;
    } catch (err) {
      const message = extractMessage(err, 'Failed to update visitor.');
      dispatch(notify(message, 'error'));
      return rejectWithValue(message);
    }
  }
);

export const deleteVisitor = createAsyncThunk(
  'visitors/delete',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      await visitorApi.remove(id);
      dispatch(notify('Visitor entry deleted.', 'success'));
      return id;
    } catch (err) {
      const message = extractMessage(err, 'Failed to delete visitor.');
      dispatch(notify(message, 'error'));
      return rejectWithValue({ id, message });
    }
  }
);

export const approveVisitor = createAsyncThunk(
  'visitors/approve',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const visitor = await visitorApi.approve(id);
      dispatch(notify(`${visitor.name} was approved.`, 'success'));
      return visitor;
    } catch (err) {
      const message = extractMessage(err, 'Failed to approve visitor.');
      dispatch(notify(message, 'error'));
      return rejectWithValue({ id, message });
    }
  }
);

export const rejectVisitor = createAsyncThunk(
  'visitors/reject',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const visitor = await visitorApi.reject(id);
      dispatch(notify(`${visitor.name} was rejected.`, 'success'));
      return visitor;
    } catch (err) {
      const message = extractMessage(err, 'Failed to reject visitor.');
      dispatch(notify(message, 'error'));
      return rejectWithValue({ id, message });
    }
  }
);

// ---------- Slice ----------

const visitorSlice = createSlice({
  name: 'visitors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchVisitors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchVisitors.fulfilled, (state, action: PayloadAction<Visitor[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) ?? 'Failed to load visitors.';
      })

      // add
      .addCase(addVisitor.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(addVisitor.fulfilled, (state, action: PayloadAction<Visitor>) => {
        state.isSubmitting = false;
        state.items.unshift(action.payload);
      })
      .addCase(addVisitor.rejected, (state) => {
        state.isSubmitting = false;
      })

      // update
      .addCase(updateVisitor.pending, (state) => {
        state.isSubmitting = true;
      })
      .addCase(updateVisitor.fulfilled, (state, action: PayloadAction<Visitor>) => {
        state.isSubmitting = false;
        const idx = state.items.findIndex((v) => v.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateVisitor.rejected, (state) => {
        state.isSubmitting = false;
      })

      // delete
      .addCase(deleteVisitor.pending, (state, action) => {
        state.actioningIds.push(action.meta.arg);
      })
      .addCase(deleteVisitor.fulfilled, (state, action: PayloadAction<string>) => {
        state.actioningIds = state.actioningIds.filter((id) => id !== action.payload);
        state.items = state.items.filter((v) => v.id !== action.payload);
      })
      .addCase(deleteVisitor.rejected, (state, action) => {
        const id = (action.payload as { id: string })?.id ?? action.meta.arg;
        state.actioningIds = state.actioningIds.filter((x) => x !== id);
      })

      // approve
      .addCase(approveVisitor.pending, (state, action) => {
        state.actioningIds.push(action.meta.arg);
      })
      .addCase(approveVisitor.fulfilled, (state, action: PayloadAction<Visitor>) => {
        state.actioningIds = state.actioningIds.filter((id) => id !== action.payload.id);
        const idx = state.items.findIndex((v) => v.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(approveVisitor.rejected, (state, action) => {
        const id = (action.payload as { id: string })?.id ?? action.meta.arg;
        state.actioningIds = state.actioningIds.filter((x) => x !== id);
      })

      // reject
      .addCase(rejectVisitor.pending, (state, action) => {
        state.actioningIds.push(action.meta.arg);
      })
      .addCase(rejectVisitor.fulfilled, (state, action: PayloadAction<Visitor>) => {
        state.actioningIds = state.actioningIds.filter((id) => id !== action.payload.id);
        const idx = state.items.findIndex((v) => v.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(rejectVisitor.rejected, (state, action) => {
        const id = (action.payload as { id: string })?.id ?? action.meta.arg;
        state.actioningIds = state.actioningIds.filter((x) => x !== id);
      });
  },
});

export default visitorSlice.reducer;
