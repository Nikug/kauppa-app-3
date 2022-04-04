import { Api, FirebaseData, TodoCollection, TodoGroup } from "./todo";

export interface UpdateGroupPayload {
  groups: FirebaseData<TodoGroup>;
}

export interface SetGroupsPayload {
  groups: FirebaseData<TodoGroup>;
}

export interface SetCollectionPayload {
  collectionId: string;
  collection: Api<TodoCollection>;
}
