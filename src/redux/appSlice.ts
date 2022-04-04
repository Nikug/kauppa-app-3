import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SetCollectionPayload,
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
    setCollection: (state, action: PayloadAction<SetCollectionPayload>) => {
      const { collectionId, collection } = action.payload;
      state.collections[collectionId] = collection;
    },
  },
});

export const { updateGroup, setGroups, setCollection } = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
export const getCollections = (state: RootState) => state.app.collections;
