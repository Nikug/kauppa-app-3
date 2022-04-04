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
    updateGroups: (state, action: PayloadAction<UpdateGroupPayload>) => {
      const { groups } = action.payload;
      state.groups = groups;
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

export const { updateGroups, setGroups, setCollection } = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
export const getCollections = (state: RootState) => state.app.collections;
export const getCollection = (
  state: RootState,
  url: string | undefined
): TodoCollection | undefined => {
  const result = Object.entries(state.app.collections).find(
    ([id, collection]) => collection.url === url
  );
  if (!result) return undefined;
  return { id: result[0], ...result[1] };
};
