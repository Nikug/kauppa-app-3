import classNames from "classnames";
import { ChangeEvent } from "react";
import { Checkbox } from "../components/inputs/Checkbox";
import { TodoItem } from "../types/todo";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { GESTURE_DISTANCE_THRESHOLD, GESTURE_MAX_DISTANCE } from "../constants";
import { Background } from "./Background";
import { updateTodo, removeTodo } from "../firebase/api";
import { capitalizeFirstLetter } from "../utils";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { EditModal } from "../types/modal";

const textClasses = (done: boolean) =>
  classNames({
    "text-black": !done,
    "font-semibold": !done,
    "text-muted-dark": done,
    "font-medium": done,
  });

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
    "transition-colors"
  );

interface Props {
  groupId: string;
  collectionId: string;
  todo: TodoItem;
}

export const Todo = (props: Props) => {
  const { todo, groupId, collectionId } = props;
  const { dispatch } = useModalContext();

  const [spring, api] = useSpring(() => ({
    from: { x: 0, zIndex: 0, visibility: "hidden" },
  }));

  const bind = useGesture(
    {
      onDrag: ({ active, movement: [x] }) => {
        api.start({
          x: active ? x : 0,
          zIndex: active ? 1 : 0,
          visibility: active ? "visible" : "hidden",
          immediate: active,
        });
      },
      onDragEnd: ({ movement: [movementX, movementY] }) => {
        if (movementY !== 0) {
          // Handle persisting reorder data
          return;
        }

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
          } else {
            updateTodoContent();
          }
        }
      },
    },
    {
      drag: {
        axis: "x",
      },
    }
  );

  const positionX = spring.x.to({
    range: [-GESTURE_MAX_DISTANCE, 0, GESTURE_MAX_DISTANCE],
    output: [-GESTURE_MAX_DISTANCE, 0, GESTURE_MAX_DISTANCE],
    extrapolate: "clamp",
  });

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    updateCheck(event.target.checked);
  };

  const updateCheck = async (done: boolean) => {
    await updateTodo(collectionId, groupId, { ...todo, done });
  };

  const handleRemove = async () => {
    await removeTodo(collectionId, groupId, todo.id);
  };

  const updateTodoContent = () => {
    dispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Edit Todo",
        label: "Content",
        value: todo.content,
        onOk: (content) =>
          updateTodo(collectionId, groupId, { ...todo, content }),
        okButtonText: "Save",
      })
    );
  };

  return (
    <div className="relative h-full">
      <animated.div
        style={{
          visibility: spring.visibility as any,
        }}
      >
        <Background done={todo.done} />
      </animated.div>
      <animated.div
        style={{ x: positionX, zIndex: spring.zIndex }}
        className={containerClasses(todo.done)}
      >
        <div className="flex w-full h-full items-center gap-4">
          <div className="">
            <Checkbox checked={todo.done} onChange={handleCheck} />
          </div>
          <div {...bind()} className="flex items-center grow h-full touch-none">
            <p className={textClasses(todo.done)}>
              {capitalizeFirstLetter(todo.content)}
            </p>
          </div>
        </div>
      </animated.div>
    </div>
  );
};
