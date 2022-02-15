import { XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { ChangeEvent } from "react";
import { Checkbox } from "../components/inputs/Checkbox";
import { IconButton } from "../components/inputs/IconButton";
import { removeTodo, updateTodo } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { TodoGroup, TodoItem } from "../types/todo";
import { useSpring, animated, config } from "@react-spring/web";
import { useDrag, useGesture } from "@use-gesture/react";

const textClasses = (done: boolean) =>
  classNames(
    {
      "text-black": !done,
      "font-semibold": !done,
      "text-muted-dark": done,
      "font-medium": done,
    },
    "capitalize"
  );

const containerClasses = (done: boolean) =>
  classNames(
    "border",
    "px-4",
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    "transition-all",
    {
      "bg-muted-light": done,
      "border-muted-light": done,
      "py-2": done,
      "py-4": !done,
    },
    "touch-none"
  );

interface Props {
  todo: TodoItem;
  group: TodoGroup;
}

export const Todo = (props: Props) => {
  const { todo, group } = props;
  const dispatch = useAppDispatch();

  const [spring, api] = useSpring(() => ({
    from: { x: 0 },
    config: { duration: 100 },
  }));

  const bind = useGesture(
    {
      onDrag: ({ down, movement: [mx] }) => {
        api.start({ x: down ? mx : 0, immediate: down });
      },
      onDragEnd: ({ distance: [distanceX], movement: [movementX] }) => {
        if (distanceX < 100) return;
        const isRight = movementX > 0;

        if (todo.done) {
          if (isRight) {
            handleRemove();
          } else {
            updateCheck(false);
          }
        } else {
          if (isRight) {
            updateCheck(true);
          }
        }
      },
    },
    { axis: "x" }
  );

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    updateCheck(event.target.checked);
  };

  const updateCheck = (done: boolean) => {
    dispatch(
      updateTodo({
        groupId: group.id,
        todo: { ...todo, done },
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeTodo({ groupId: group.id, todo: todo }));
  };

  return (
    <animated.div
      {...bind()}
      className={containerClasses(todo.done)}
      style={spring}
    >
      <div className="flex gap-x-4">
        <Checkbox checked={todo.done} onChange={handleCheck} />
        <p className={textClasses(todo.done)}>{todo.content}</p>
      </div>
      <IconButton
        icon={<XIcon />}
        className="text-primary hover:text-primary-dark"
        onClick={handleRemove}
      />
    </animated.div>
  );
};
