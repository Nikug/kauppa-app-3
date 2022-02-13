import { Todo } from "../todo";
import { TodoInput } from "../components/TodoInput";
import { TodoGroup } from "../types/todo";
import { GroupHeader } from "../components/GroupHeader";

interface Props {
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group } = props;

  return (
    <div className="w-full max-w-content">
      <GroupHeader group={group} />
      <div className="fixed top-16 bottom-16 w-full max-w-content overflow-y-auto">
        {group.todos?.map((todo) => (
          <Todo key={todo.id} todo={todo} group={group} />
        ))}
      </div>
      <TodoInput group={group} />
    </div>
  );
};
