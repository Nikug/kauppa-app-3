import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddTodoPayload } from "../types/redux";
import { TodoGroup } from "../types/todo";
import { RootState } from "./store";

interface AppState {
  groups: TodoGroup[];
}

const initialState: AppState = {
  groups: [{ id: "main", name: "Main", todos: [] }],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      for (const group of state.groups) {
        if (group.id === action.payload.groupdId) {
          if (!group.todos) group.todos = [];
          group.todos.push(action.payload.todo);
          break;
        }
      }
    },
  },
});

export const { addTodo } = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
