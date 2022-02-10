import { Todo } from "../components/Todo";
import { TodoInput } from "../components/TodoInput";
import { TodoGroup } from "../types/todo";

interface Props {
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group } = props;

  return (
    <div className="w-full max-w-content">
      <h2>{group.name}</h2>
      <div>
        {group.todos?.map((todo) => (
          <Todo key={todo.id} todoItem={todo} />
        ))}
        <TodoInput group={group} />
      </div>
    </div>
  );
};
