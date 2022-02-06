import { Todo } from "../components/Todo";
import { TodoGroup } from "../types/todo";

interface Props {
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group } = props;

  return (
    <div className="w-content mx-auto">
      <h2>{group.name}</h2>
      <div>
        {group.todos?.map((todo) => (
          <Todo key={todo.id} todoItem={todo} />
        ))}
      </div>
    </div>
  );
};
