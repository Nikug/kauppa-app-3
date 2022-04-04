import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { GroupHeader } from "../components/GroupHeader";
import { animated, useTransition } from "@react-spring/web";
import { ANIMATION_DURATION, TODO_ITEM_HEIGHT } from "../constants";
import { useEffect, useMemo } from "react";
import { listenForGroup } from "../firebase/api";
import { TodoGroup, TodoItem } from "../types/todo";

interface Props {
  groupId: string;
  collectionId: string;
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group, groupId, collectionId } = props;

  useEffect(() => {
    const unsubscribe = listenForGroup(collectionId, groupId);
    return unsubscribe;
  }, [groupId, collectionId]);

  const todos: TodoItem[] | undefined = useMemo(() => {
    if (!group.todos) return undefined;
    return Object.entries(group.todos).map(([id, todo]) => ({
      id: id,
      ...todo,
    }));
  }, [group.todos]);

  const transitions = useTransition(todos ?? [], {
    initial: { opacity: 1, height: TODO_ITEM_HEIGHT },
    from: { opacity: 0, height: "0" },
    enter: { opacity: 1, height: TODO_ITEM_HEIGHT },
    leave: { opacity: 0, height: "0" },
    delay: ANIMATION_DURATION,
    keys: (todo) => todo.id,
  });

  return (
    <div className="w-full max-w-content">
      <GroupHeader group={group} />
      <div className="fixed top-16 bottom-16 w-full max-w-content overflow-y-auto overflow-x-hidden">
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
