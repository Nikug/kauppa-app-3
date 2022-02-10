import { TodoItem } from "./todo";

export interface AddTodoPayload {
  groupId: string;
  todo: TodoItem;
}
