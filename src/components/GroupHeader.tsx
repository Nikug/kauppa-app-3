import { TodoGroup } from "../types/todo";

interface Props {
  group: TodoGroup;
}

export const GroupHeader = (props: Props) => {
  const { group } = props;

  return (
    <div className="bg-secondary-light text-white w-full max-w-content h-16 flex items-center px-4 fixed top-0">
      <h2 className="font-bold">{group.name}</h2>
    </div>
  );
};
