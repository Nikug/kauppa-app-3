import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { t } from "i18next";
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
        title: t("modal.editList"),
        label: t("modal.name"),
        value: group.name,
        okButtonText: t("modal.save"),
        onOk: (value) => updateGroup(collectionId, group.id, value),
      })
    );
  };

  const handleGroupRemove = () => {
    if (!collectionId) return;
    dispatch(
      createModal<ConfirmationModal>({
        type: "confirmation",
        title: t("modal.removeList"),
        okButtonText: t("modal.remove"),
        onOk: () => removeGroup(collectionId, group.id),
      })
    );
  };

  const todoCount = useMemo(() => getTodoCount(group), [group]);

  return (
    <div className="border bg-white p-4 flex justify-between items-center">
      <div className="cursor-pointer" onClick={() => onSelect(group.id)}>
        <h4>
          {group.name || <i>{t("general.noName")}</i>}{" "}
          {todoCount ? `(${todoCount})` : ""}
        </h4>
      </div>
      <div className="flex justify-end gap-2">
        <PencilIcon
          className="w-7 h-7 text-icon cursor-pointer"
          onClick={editGroup}
        />
        <TrashIcon
          className="w-7 h-7 text-primary cursor-pointer"
          onClick={handleGroupRemove}
        />
      </div>
    </div>
  );
};
