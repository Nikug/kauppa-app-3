import { TodoGroup, TodoItem } from "./todo";

export interface AddTodoPayload {
  groupId: string;
  todo: TodoItem;
}

export interface UpdateTodoPayload {
  groupId: string;
  todo: TodoItem;
}

export interface RemoveTodoPayload {
  groupId: string;
  todo: TodoItem;
}

export interface UpdateGroupPayload {
  group: TodoGroup;
}
