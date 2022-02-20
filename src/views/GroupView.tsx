import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { TodoGroup } from "../types/todo";
import { GroupHeader } from "../components/GroupHeader";
import { animated, useTransition } from "@react-spring/web";
import { ANIMATION_DURATION, TODO_ITEM_HEIGHT } from "../constants";
import { useEffect } from "react";
import { listenForGroup } from "../firebase/api";

interface Props {
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group } = props;

  useEffect(() => {
    const unsubscribe = listenForGroup(group.id);
    return unsubscribe;
  }, [group.id]);

  const transitions = useTransition(group.todos ?? [], {
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
                <Todo key={todo.id} todo={todo} group={group} />
              </animated.div>
            )
        )}
      </div>
      <TodoInput group={group} />
    </div>
  );
};
