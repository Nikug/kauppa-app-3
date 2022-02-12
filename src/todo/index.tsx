import { Checkbox } from "../components/inputs/Checkbox";
import { TodoItem } from "../types/todo";

interface Props {
  todo: TodoItem;
}

export const Todo = (props: Props) => {
  const { todo } = props;

  return (
    <div className="border px-4 py-4 font-semibold flex items-center gap-4">
      <Checkbox />
      <p>{todo.content}</p>
    </div>
  );
};
