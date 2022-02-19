import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { TodoGroup } from "../types/todo";
import { GroupHeader } from "../components/GroupHeader";
import { animated, useTransition } from "@react-spring/web";

interface Props {
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group } = props;

  const transitions = useTransition(group.todos ?? [], {
    from: { opacity: 0, height: "0" },
    enter: { opacity: 1, height: "4rem" },
    leave: { opacity: 0, height: "0" },
    delay: 200,
    keys: (todo) => todo.id,
    exitBeforeEnter: false,
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
