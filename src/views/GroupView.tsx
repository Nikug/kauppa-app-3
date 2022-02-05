import { Todo } from "../components/Todo";
import { TodoGroup } from "../types/todo";

interface Props {
  group: TodoGroup;
}

export const Groupview = (props: Props) => {
  const { group } = props;

  return (
    <div>
      <div>{group.name}</div>
      <div>
        {group.todos?.map((todo) => (
          <Todo todoItem={todo} />
        ))}
      </div>
    </div>
  );
};
