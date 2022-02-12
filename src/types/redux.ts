import { TodoItem } from "./todo";

export interface AddTodoPayload {
  groupId: string;
  todo: TodoItem;
}

export interface UpdateTodoPayload {
  groupId: string;
  todo: TodoItem;
}
