import type { TodoItem } from "../types/todo";

interface Props {
  todoItem: TodoItem;
}

export const Todo = (props: Props) => {
  const { todoItem } = props;

  return <div>{todoItem.content}</div>;
};
