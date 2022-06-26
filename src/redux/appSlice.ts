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
  UserSettings,
} from "../types/todo";

interface AppState {
  groups: FirebaseData<TodoGroup>;
  groupOrder: string[];
  collections: FirebaseData<TodoCollection>;
  collectionOrder: string[];
  selectedCollection: string | null;
  selectedGroup: string | null;
  options: AppOptions;
  userSettings?: UserSettings;
}

const initialState: AppState = {
  groups: {},
  groupOrder: [],
  collections: {},
  collectionOrder: [],
  selectedCollection: null,
  selectedGroup: null,
  options: { show: false },
  userSettings: {},
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
    setGroupOrder: (state, action: PayloadAction<string[]>) => {
      state.groupOrder = action.payload;
    },
    setCollection: (state, action: PayloadAction<SetCollectionPayload>) => {
      const { collectionId, collection } = action.payload;
      state.collections[collectionId] = collection;
    },
    setCollectionOrder: (state, action: PayloadAction<string[]>) => {
      state.collectionOrder = action.payload;
    },
    removeCollection: (state, action: PayloadAction<string>) => {
      delete state.collections[action.payload];
      state.collectionOrder = state.collectionOrder.filter(
        (collection) => collection !== action.payload
      );
    },
    setSelectedCollection: (state, action: PayloadAction<string | null>) => {
      state.selectedCollection = action.payload;
    },
    setSelectedCollectionWithId: (state, action: PayloadAction<string>) => {
      state.selectedCollection = action.payload;
    },
    setSelectedGroup: (state, action: PayloadAction<string | null>) => {
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
    updateUserSettings: (state, action: PayloadAction<UserSettings>) => {
      state.userSettings = action.payload;
    },
  },
});

// Dispatch actions
export const {
  hideOptions,
  removeCollection,
  removeGroup,
  setCollection,
  setCollectionOrder,
  setGroups,
  setGroupOrder,
  setSelectedCollection,
  setSelectedCollectionWithId,
  setSelectedGroup,
  showOptions,
  updateGroups,
  updateUserSettings,
} = appSlice.actions;
export default appSlice.reducer;
