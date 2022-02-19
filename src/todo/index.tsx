import classNames from "classnames";
import { ChangeEvent } from "react";
import { Checkbox } from "../components/inputs/Checkbox";
import { removeTodo, updateTodo } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { TodoGroup, TodoItem } from "../types/todo";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { GESTURE_DISTANCE_THRESHOLD, GESTURE_MAX_DISTANCE } from "../constants";
import { Background } from "./Background";

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
    "absolute",
    "w-full",
    "h-full",
    "border",
    "px-4",
    "flex",
    "items-center",
    "justify-between",
    "gap-4",
    {
      "bg-muted-light": done,
      "border-muted-light": done,
      "bg-white": !done,
    },
    "touch-none",
    "transition-colors"
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
  }));

  const bind = useGesture({
    onDrag: ({ active, movement: [x] }) => {
      api.start({
        x: active ? x : 0,
        immediate: (name) => active && name === "x",
      });
    },
    onDragEnd: ({ movement: [movementX] }) => {
      if (Math.abs(movementX) < GESTURE_DISTANCE_THRESHOLD) return;
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
  });

  const position = spring.x.to({
    range: [-GESTURE_MAX_DISTANCE, 0, GESTURE_MAX_DISTANCE],
    output: [-GESTURE_MAX_DISTANCE, 0, GESTURE_MAX_DISTANCE],
    extrapolate: "clamp",
  });

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
    <div className="relative h-full">
      <Background done={todo.done} />
      <animated.div
        style={{ x: position }}
        className={containerClasses(todo.done)}
      >
        <div className="flex w-full h-full items-center gap-4">
          <div className="">
            <Checkbox checked={todo.done} onChange={handleCheck} />
          </div>
          <div {...bind()} className="flex items-center grow h-full">
            <p className={textClasses(todo.done)}>{todo.content}</p>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
