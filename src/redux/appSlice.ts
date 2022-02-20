import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddTodoPayload,
  RemoveTodoPayload,
  SetGroupsPayload,
  UpdateGroupPayload,
  UpdateTodoPayload,
} from "../types/redux";
import { TodoGroup } from "../types/todo";
import { RootState } from "./store";

interface AppState {
  groups: TodoGroup[];
}

const initialState: AppState = {
  groups: [],
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
      const index = state.groups.findIndex(
        (existingGroup) => existingGroup.id === group.id
      );
      if (index < 0) {
        state.groups.push(group);
      } else {
        state.groups[index] = group;
      }
    },
    setGroups: (state, action: PayloadAction<SetGroupsPayload>) => {
      const { groups } = action.payload;
      state.groups = groups;
    },
  },
});

export const { addTodo, updateTodo, removeTodo, updateGroup, setGroups } =
  appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
