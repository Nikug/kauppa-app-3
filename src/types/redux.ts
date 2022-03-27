import { FirebaseData, TodoCollection, TodoGroup } from "./todo";

export interface UpdateGroupPayload {
  groupId: string;
  group: TodoGroup;
}

export interface SetGroupsPayload {
  groups: FirebaseData<TodoGroup>;
}

export interface SetCollectionsPayload {
  collections: FirebaseData<TodoCollection>;
}
