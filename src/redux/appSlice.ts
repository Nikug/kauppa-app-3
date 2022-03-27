import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SetCollectionsPayload,
  SetGroupsPayload,
  UpdateGroupPayload,
} from "../types/redux";
import { FirebaseData, TodoCollection, TodoGroup } from "../types/todo";
import { RootState } from "./store";

interface AppState {
  groups: FirebaseData<TodoGroup>;
  collections: FirebaseData<TodoCollection>;
}

const initialState: AppState = { groups: {}, collections: {} };

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
    setCollections: (state, action: PayloadAction<SetCollectionsPayload>) => {
      const { collections } = action.payload;
      state.collections = collections;
    },
  },
});

export const { updateGroup, setGroups, setCollections } = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
