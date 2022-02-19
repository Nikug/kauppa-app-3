import classNames from "classnames";
import { ChangeEvent } from "react";
import { Checkbox } from "../components/inputs/Checkbox";
import { removeTodo, updateTodo } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";
import { TodoGroup, TodoItem } from "../types/todo";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { GESTURE_DISTANCE_THRESHOLD } from "../constants";
import {
  CheckIcon,
  PencilIcon,
  RewindIcon,
  TrashIcon,
} from "@heroicons/react/outline";

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
    "h-16",
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

const backgroundClasses = classNames(
  "h-16",
  "px-4",
  "flex",
  "justify-between",
  "items-center"
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
    onDragEnd: ({ movement: [movementX], ...rest }) => {
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

  const transition = useTransition(todo.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leaver: { opacity: 0 },
    delay: 200,
  });

  const position = spring.x.to({
    range: [-100, 0, 100],
    output: [-100, 0, 100],
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

  return transition(
    (styles, id) =>
      id && (
        <animated.div className="relative" style={styles}>
          <animated.div
            {...bind()}
            style={{ x: position }}
            className={containerClasses(todo.done)}
          >
            <div className="flex gap-x-4">
              <Checkbox checked={todo.done} onChange={handleCheck} />
              <p className={textClasses(todo.done)}>{todo.content}</p>
            </div>
          </animated.div>
          {todo.done && (
            <div
              className={classNames(
                backgroundClasses,
                "bg-gradient-to-r from-white to-secondary via-white"
              )}
            >
              <TrashIcon className="h-8 w-8 text-primary-dark" />
              <RewindIcon className="h-8 w-8 text-white" />
            </div>
          )}
          {!todo.done && (
            <div
              className={classNames(
                backgroundClasses,
                "bg-gradient-to-l from-white to-primary-dark via-white"
              )}
            >
              <CheckIcon className="h-8 w-8 text-white" />
              <PencilIcon className="h-8 w-8 text-primary-dark" />
            </div>
          )}
        </animated.div>
      )
  );
};
