import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface TodoState {
  todo: string[];
}

const initialState: TodoState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      state.todo.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.todo.splice(action.payload, 1);
    },
  },
});

export const { add, remove } = todoSlice.actions;

export const returnTodo = (state: RootState) => state.todo.todo;

export default todoSlice.reducer;
