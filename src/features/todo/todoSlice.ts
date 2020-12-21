import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ITodo {
  id: string;
  content: string;
  pin: boolean;
}

interface TodoState {
  todo: ITodo[];
}

const initialState: TodoState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<ITodo>) => {
        state.todo.push(action.payload);
      },
      prepare: (content: string) => {
        return {
          payload: {
            id: nanoid(),
            content,
            pin: false,
          },
        };
      },
    },
    remove: (state, action: PayloadAction<string>) => {
      state.todo.splice(
        state.todo.findIndex(item => item.id === action.payload),
        1
      );
    },
    togglePin: (state, action: PayloadAction<string>) => {
      const todoState = state.todo.find(item => item.id === action.payload);
      if (todoState) todoState.pin = !todoState?.pin;
    },
  },
});

export const { add, remove, togglePin } = todoSlice.actions;

export const returnTodo = (state: RootState) => state.todo.todo;

export default todoSlice.reducer;
