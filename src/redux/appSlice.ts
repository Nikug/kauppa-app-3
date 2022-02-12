import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddTodoPayload, UpdateTodoPayload } from "../types/redux";
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
      const { groupId, todo } = action.payload;
      for (const group of state.groups) {
        if (group.id === groupId) {
          if (!group.todos) group.todos = [];
          group.todos.push(todo);
          break;
        }
      }
    },
    updateTodo: (state, action: PayloadAction<UpdateTodoPayload>) => {
      const { groupId, todo } = action.payload;
      state.groups = state.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              todos: group.todos?.map((oldTodo) =>
                oldTodo.id === todo.id ? todo : oldTodo
              ),
            }
          : group
      );
    },
  },
});

export const { addTodo, updateTodo } = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
