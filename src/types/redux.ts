import { FirebaseData, TodoGroup } from "./todo";

export interface UpdateGroupPayload {
  groupId: string;
  group: TodoGroup;
}

export interface SetGroupsPayload {
  groups: FirebaseData<TodoGroup>;
}
