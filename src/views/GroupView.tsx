import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { animated, useTransition } from "@react-spring/web";
import { ANIMATION_DURATION, TODO_ITEM_HEIGHT } from "../constants";
import { useRef } from "react";
import { TodoGroup } from "../types/todo";

interface Props {
  group: TodoGroup;
  collectionId: string;
}

export const GroupView = (props: Props) => {
  const { group, collectionId } = props;
  const todoOrder = useRef(Object.keys(group.todos ?? []));

  const transitions = useTransition(todoOrder.current, {
    initial: { opacity: 1, height: TODO_ITEM_HEIGHT },
    from: { opacity: 0, height: "0" },
    enter: { opacity: 1, height: TODO_ITEM_HEIGHT },
    leave: { opacity: 0, height: "0" },
    delay: ANIMATION_DURATION,
    key: (key: string) => key,
  });

  return (
    <div className="w-full max-w-content">
      <div className="fixed top-20 bottom-16 w-full max-w-content overflow-y-auto overflow-x-hidden">
        {transitions(
          (styles, id, _, index) =>
            group.todos?.[id] && (
              <animated.div style={styles}>
                <Todo
                  key={id}
                  index={index}
                  todo={{ id, ...group.todos[id] }}
                  groupId={group.id}
                  collectionId={collectionId}
                />
              </animated.div>
            )
        )}
      </div>
      <TodoInput groupId={group.id} collectionId={collectionId} />
    </div>
  );
};
