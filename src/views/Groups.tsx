import { useEffect, useMemo } from "react";
import { Group } from "../components/Group";
import { listenForGroups } from "../firebase/api";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
  setSelectedGroup,
} from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TodoGroup } from "../types/todo";
import { GroupView } from "./GroupView";

export const Groups = () => {
  const groups = useAppSelector(getGroups);
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedCollection?.id) return;
    const unsubscribe = listenForGroups(selectedCollection.id);
    return unsubscribe;
  }, [selectedCollection?.id]);

  const groupList: TodoGroup[] = useMemo(() => {
    if (!groups) return [];
    return Object.entries(groups).map(([id, group]) => ({
      id: id,
      ...group,
    }));
  }, [groups]);

  const handleGroupSelect = (groupId: string) =>
    dispatch(setSelectedGroup(groupId));

  return (
    <div>
      {groups && !selectedGroup && (
        <div>
          {groupList?.map((group) => (
            <Group
              key={group.id}
              group={group}
              onSelect={(id) => handleGroupSelect(id)}
            />
          ))}
        </div>
      )}
      {groups && selectedGroup && selectedCollection && (
        <GroupView group={selectedGroup} collectionId={selectedCollection.id} />
      )}
    </div>
  );
};
