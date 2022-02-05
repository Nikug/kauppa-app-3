import { TodoItem } from "./todo";

export interface AddTodoPayload {
  groupdId: string;
  todo: TodoItem;
}
