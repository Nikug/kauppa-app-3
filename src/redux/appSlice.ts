import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetGroupsPayload, UpdateGroupPayload } from "../types/redux";
import { FirebaseData, TodoGroup } from "../types/todo";
import { RootState } from "./store";

interface AppState {
  groups: FirebaseData<TodoGroup>;
}

const initialState: AppState = { groups: {} };

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateGroup: (state, action: PayloadAction<UpdateGroupPayload>) => {
      const { groupId, group } = action.payload;
      state.groups[groupId] = group;
    },
    setGroups: (state, action: PayloadAction<SetGroupsPayload>) => {
      const { groups } = action.payload;
      state.groups = groups;
    },
  },
});

export const { updateGroup, setGroups } = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
