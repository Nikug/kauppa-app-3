import classNames from "classnames";
import { Checkbox } from "../components/inputs/Checkbox";
import { updateTodo } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { TodoGroup, TodoItem } from "../types/todo";

const textClasses = (done: boolean) =>
  classNames({
    "text-black": !done,
    "font-semibold": !done,
    "text-muted-dark": done,
    "font-medium": done,
  });

const containerClasses = (done: boolean) =>
  classNames(
    "border",
    "px-4",
    "flex",
    "items-center",
    "gap-4",
    "transition-all",
    {
      "bg-muted-light": done,
      "border-muted-light": done,
      "py-2": done,
      "py-4": !done,
    }
  );

interface Props {
  todo: TodoItem;
  group: TodoGroup;
}

export const Todo = (props: Props) => {
  const { todo, group } = props;
  const dispatch = useAppDispatch();

  return (
    <div className={containerClasses(todo.done)}>
      <Checkbox
        checked={todo.done}
        onChange={(event) =>
          dispatch(
            updateTodo({
              groupId: group.id,
              todo: { ...todo, done: event.target.checked },
            })
          )
        }
      />
      <p className={textClasses(todo.done)}>{todo.content}</p>
    </div>
  );
};
