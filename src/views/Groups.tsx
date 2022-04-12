import { useEffect, useMemo } from "react";
import { Group } from "../components/Group";
import { Button } from "../components/inputs/Button";
import { createNewGroup } from "../components/TodoNavBar";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { addGroup, listenForGroups } from "../firebase/api";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
  setSelectedGroup,
} from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EditModal } from "../types/modal";
import { TodoGroup } from "../types/todo";
import { GroupView } from "./GroupView";

export const Groups = () => {
  const groups = useAppSelector(getGroups);
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const dispatch = useAppDispatch();
  const { dispatch: modalDispatch } = useModalContext();

  useEffect(() => {
    if (!selectedCollection?.url) return;
    const unsubscribe = listenForGroups(selectedCollection.url);
    return unsubscribe;
  }, [selectedCollection?.url]);

  const groupList: TodoGroup[] = useMemo(() => {
    if (!groups) return [];
    return Object.entries(groups).map(([id, group]) => ({
      id: id,
      ...group,
    }));
  }, [groups]);

  const handleGroupSelect = (groupId: string) =>
    dispatch(setSelectedGroup(groupId));

  const createGroup = () => {
    if (!selectedCollection) return;
    const newGroup = createNewGroup();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Create group",
        label: "Name",
        value: newGroup.name,
        okButtonText: "Save",
        onOk: (value) =>
          addGroup(selectedCollection.url, { ...newGroup, name: value }),
      })
    );
  };

  return (
    <div>
      {!groupList.length && (
        <div className="h-screen flex flex-col justify-center items-center">
          <i className="mb-8">No groups</i>
          <Button className="primary" onClick={createGroup}>
            Create group
          </Button>
        </div>
      )}
      {groups && !selectedGroup && (
        <div>
          {groupList?.map((group) => (
            <Group
              key={group.id}
              collectionId={selectedCollection?.url}
              group={group}
              onSelect={(id) => handleGroupSelect(id)}
            />
          ))}
        </div>
      )}
      {groups && selectedGroup && selectedCollection && (
        <GroupView
          group={selectedGroup}
          collectionId={selectedCollection.url}
        />
      )}
    </div>
  );
};
