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
  selectedCollection: string | null;
  selectedGroup: string | null;
}

const initialState: AppState = {
  groups: {},
  collections: {},
  selectedCollection: null,
  selectedGroup: null,
};

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
    setSelectedCollection: (state, action: PayloadAction<string>) => {
      state.selectedCollection = action.payload;
    },
    setSelectedCollectionWithUrl: (state, action: PayloadAction<string>) => {
      if (!state.collections) return;
      const result = Object.entries(state.collections).find(
        ([, collection]) => collection.url === action.payload
      );
      state.selectedCollection = result ? result[0] : null;
    },
    setSelectedGroup: (state, action: PayloadAction<string>) => {
      state.selectedGroup = action.payload;
    },
  },
});

export const {
  updateGroups,
  setGroups,
  setCollection,
  setSelectedCollection,
  setSelectedCollectionWithUrl,
  setSelectedGroup,
} = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
export const getCollections = (state: RootState) => state.app.collections;
export const getCollection = (
  state: RootState,
  url: string | null
): TodoCollection | undefined => {
  const result = Object.entries(state.app.collections).find(
    ([id, collection]) => collection.url === url
  );
  if (!result) return undefined;
  return { id: result[0], ...result[1] };
};
export const getSelectedCollection = (
  state: RootState
): TodoCollection | undefined => {
  if (state.app.selectedCollection == null) return undefined;
  return {
    id: state.app.selectedCollection,
    ...state.app.collections[state.app.selectedCollection],
  };
};
export const getSelectedGroup = (state: RootState): TodoGroup | undefined => {
  if (state.app.selectedGroup == null) return undefined;
  return {
    id: state.app.selectedGroup,
    ...state.app.groups[state.app.selectedGroup],
  };
};
