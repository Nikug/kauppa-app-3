import { useMemo } from "react";
import { TodoGroup } from "../types/todo";
import { getTodoCount } from "../utils";

interface Props {
  group: TodoGroup;
  onSelect(groupId: string): void;
}

export const Group = (props: Props) => {
  const { group, onSelect } = props;

  const todoCount = useMemo(() => getTodoCount(group), [group]);

  return (
    <div className="border bg-white p-4">
      <div className="cursor-pointer" onClick={() => onSelect(group.id)}>
        <h2>
          {group.name ?? <i>No name</i>} {todoCount ? `(${todoCount})` : ""}
        </h2>
        <p>{group.id}</p>
      </div>
    </div>
  );
};
