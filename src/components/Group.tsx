import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useMemo } from "react";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { removeGroup, updateGroup } from "../firebase/api";
import { ConfirmationModal, EditModal } from "../types/modal";
import { TodoGroup } from "../types/todo";
import { getTodoCount } from "../utils";

interface Props {
  group: TodoGroup;
  collectionId?: string;
  onSelect(groupId: string): void;
}

export const Group = (props: Props) => {
  const { group, collectionId, onSelect } = props;
  const { dispatch } = useModalContext();

  const editGroup = () => {
    if (!collectionId) return;
    dispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Edit group",
        label: "Name",
        value: group.name,
        okButtonText: "Save",
        onOk: (value) => updateGroup(collectionId, group.id, value),
      })
    );
  };

  const handleGroupRemove = () => {
    if (!collectionId) return;
    dispatch(
      createModal<ConfirmationModal>({
        type: "confirmation",
        title: "Remove group",
        okButtonText: "Remove",
        onOk: () => removeGroup(collectionId, group.id),
      })
    );
  };

  const todoCount = useMemo(() => getTodoCount(group), [group]);

  return (
    <div className="border bg-white p-4 flex justify-between items-center">
      <div className="cursor-pointer" onClick={() => onSelect(group.id)}>
        <h2>
          {group.name ?? <i>No name</i>} {todoCount ? `(${todoCount})` : ""}
        </h2>
        <p>{group.id}</p>
      </div>
      <div className="flex justify-end gap-2">
        <PencilIcon
          className="w-8 h-8 text-icon cursor-pointer"
          onClick={editGroup}
        />
        <TrashIcon
          className="w-8 h-8 text-primary cursor-pointer"
          onClick={handleGroupRemove}
        />
      </div>
    </div>
  );
};
