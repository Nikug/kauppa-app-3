import { useEffect, useMemo } from "react";
import { Button } from "../components/inputs/Button";
import { listenForGroups } from "../firebase/api";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
} from "../redux/appSlice";
import { useAppSelector } from "../redux/hooks";
import { TodoGroup } from "../types/todo";
import { GroupView } from "./GroupView";

export const Groups = () => {
  const groups = useAppSelector(getGroups);
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);

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

  const createGroup = () => console.log("creating a group");
  const handleGroupSelect = (group: TodoGroup) =>
    console.log("selecting a group", group.id);

  return (
    <div>
      {!groups && (
        <div className="mt-4">
          <Button className="bg-primary" onClick={createGroup}>
            Add group
          </Button>
        </div>
      )}
      {groups && !selectedGroup && (
        <div>
          {groupList?.map((group) => (
            <option key={group.id} onClick={() => handleGroupSelect(group)}>
              {group.name} todos:{" "}
              {Object.values(group?.todos ?? {}).length ?? 0}
            </option>
          ))}
        </div>
      )}
      {groups && selectedGroup && selectedCollection && (
        <GroupView group={selectedGroup} collectionId={selectedCollection.id} />
      )}
    </div>
  );
};
