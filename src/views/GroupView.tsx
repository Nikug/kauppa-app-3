import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { animated, useTransition } from "@react-spring/web";
import { ANIMATION_DURATION, TODO_ITEM_HEIGHT } from "../constants";
import { useMemo } from "react";
import { TodoItem } from "../types/todo";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { getSelectedGroup } from "../redux/appSlice";

export const GroupView = () => {
  const { collectionId, groupId } =
    useParams<{ collectionId: string; groupId: string }>();
  const group = useAppSelector(getSelectedGroup);

  const todos: TodoItem[] | undefined = useMemo(() => {
    if (!group?.todos) return undefined;
    return Object.entries(group.todos).map(([id, todo]) => ({
      id: id,
      ...todo,
    }));
  }, [group?.todos]);

  const transitions = useTransition(todos ?? [], {
    initial: { opacity: 1, height: TODO_ITEM_HEIGHT },
    from: { opacity: 0, height: "0" },
    enter: { opacity: 1, height: TODO_ITEM_HEIGHT },
    leave: { opacity: 0, height: "0" },
    delay: ANIMATION_DURATION,
    keys: (todo) => todo.id,
  });

  if (!groupId || !collectionId) return null;

  return (
    <div className="w-full max-w-content">
      <div className="fixed top-20 bottom-16 w-full max-w-content overflow-y-auto overflow-x-hidden">
        {transitions(
          (styles, todo) =>
            todo && (
              <animated.div style={styles}>
                <Todo
                  key={todo.id}
                  todo={todo}
                  groupId={groupId}
                  collectionId={collectionId}
                />
              </animated.div>
            )
        )}
      </div>
      <TodoInput groupId={groupId} collectionId={collectionId} />
    </div>
  );
};
