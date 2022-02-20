import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddTodoPayload,
  RemoveTodoPayload,
  UpdateGroupPayload,
  UpdateTodoPayload,
} from "../types/redux";
import { TodoGroup } from "../types/todo";
import { RootState } from "./store";
import { v1 as uuid } from "uuid";

interface AppState {
  groups: TodoGroup[];
}

const initialState: AppState = {
  groups: [
    {
      id: "main",
      name: "Main",
      todos: [
        { id: uuid(), content: "Banaani", done: false },
        { id: uuid(), content: "Omena", done: false },
        { id: uuid(), content: "appelsiini", done: true },
      ],
    },
  ],
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
    removeTodo: (state, action: PayloadAction<RemoveTodoPayload>) => {
      const { groupId, todo } = action.payload;
      state.groups = state.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              todos: group.todos?.filter((oldTodo) => oldTodo.id !== todo.id),
            }
          : group
      );
    },
    updateGroup: (state, action: PayloadAction<UpdateGroupPayload>) => {
      const { group } = action.payload;
      state.groups = state.groups.map((oldGroup) =>
        oldGroup.id === group.id ? group : oldGroup
      );
    },
  },
});

export const { addTodo, updateTodo, removeTodo, updateGroup } =
  appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
