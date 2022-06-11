import { TodoCollection, TodoGroup } from "../types/todo";
import { RootState } from "./store";

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
  if (state.app.groups == null) return undefined;
  return {
    id: state.app.selectedGroup,
    ...state.app.groups[state.app.selectedGroup],
  };
};

export const getShowOptions = (state: RootState) => state.app.options.show;
export const getUserSettings = (state: RootState) => state.app.userSettings;
export const getCollectionOrder = (state: RootState) =>
  state.app.collectionOrder;
export const getGroupOrder = (state: RootState) => state.app.groupOrder;
