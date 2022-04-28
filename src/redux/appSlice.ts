import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SetCollectionPayload,
  SetGroupsPayload,
  UpdateGroupPayload,
} from "../types/redux";
import {
  AppOptions,
  FirebaseData,
  TodoCollection,
  TodoGroup,
} from "../types/todo";
import { RootState } from "./store";

interface AppState {
  groups: FirebaseData<TodoGroup>;
  collections: FirebaseData<TodoCollection>;
  selectedCollection: string | null;
  selectedGroup: string | null;
  options: AppOptions;
}

const initialState: AppState = {
  groups: {},
  collections: {},
  selectedCollection: null,
  selectedGroup: null,
  options: { show: false },
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
      const { collectionUrl, collection } = action.payload;
      state.collections[collectionUrl] = collection;
    },
    removeCollection: (state, action: PayloadAction<string>) => {
      delete state.collections[action.payload];
    },
    setSelectedCollection: (state, action: PayloadAction<string>) => {
      state.selectedCollection = action.payload;
    },
    setSelectedCollectionWithUrl: (state, action: PayloadAction<string>) => {
      state.selectedCollection = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<string>) => {
      state.selectedGroup = action.payload;
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      delete state.groups[action.payload];
    },
    showOptions: (state) => {
      state.options.show = true;
    },
    hideOptions: (state) => {
      state.options.show = false;
    },
  },
});

export const {
  updateGroups,
  setGroups,
  setCollection,
  removeCollection,
  setSelectedCollection,
  setSelectedCollectionWithUrl,
  setSelectedGroup,
  removeGroup,
  showOptions,
  hideOptions,
} = appSlice.actions;
export default appSlice.reducer;

export const getGroups = (state: RootState) => state.app.groups;
export const getCollections = (state: RootState) => state.app.collections;
export const getCollection = (
  state: RootState,
  url: string | null
): TodoCollection | undefined => {
  const result = Object.entries(state.app.collections).find(
    ([id]) => id === url
  );
  if (!result) return undefined;
  return { url: result[0], ...result[1] };
};
export const getSelectedCollection = (
  state: RootState
): TodoCollection | undefined => {
  if (state.app.selectedCollection == null) return undefined;
  return {
    url: state.app.selectedCollection,
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
export const getShowOptions = (state: RootState) => state.app.options.show;
