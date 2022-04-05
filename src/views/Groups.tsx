import { getAuth } from "firebase/auth";
import humanId from "human-id";
import { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { Button } from "../components/inputs/Button";
import { addGroup, listenForGroups } from "../firebase/api";
import { getCollection, getGroups } from "../redux/appSlice";
import { useAppSelector } from "../redux/hooks";
import { Api, TodoGroup } from "../types/todo";
import { listenForCollections } from "../firebase/api";
import { Dropdown } from "../components/Dropdown";

const createNewGroup = (): Api<TodoGroup> => ({
  name: humanId({ separator: "-", capitalize: false }),
});

export const Groups = () => {
  const { id: collectionUrl } = useParams<{ id: string }>();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [selectedGroup, setSelectedGroup] = useState<TodoGroup | undefined>();

  const groups = useAppSelector(getGroups);
  const collection = useAppSelector((state) =>
    getCollection(state, collectionUrl)
  );

  useEffect(() => {
    if (!collection?.id) return;
    const unsubscribe = listenForGroups(collection.id);
    return unsubscribe;
  }, [collection?.id]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  const groupList: TodoGroup[] = useMemo(() => {
    if (!groups) return [];
    return Object.entries(groups).map(([id, group]) => ({
      id: id,
      ...group,
    }));
  }, [groups]);

  const createGroup = () => {
    if (!collection) return;
    const newGroup = createNewGroup();
    addGroup(collection.id, newGroup);
  };

  return (
    <div>
      <div className="mt-4">
        <Button className="bg-primary" onClick={createGroup}>
          Add group
        </Button>
      </div>
      <div>
        <Dropdown value={selectedGroup ? selectedGroup.name : "Select a group"}>
          {groupList?.map((group) => (
            <option key={group.id} onClick={() => setSelectedGroup(group)}>
              {group.name} todos:{" "}
              {Object.values(group?.todos ?? {}).length ?? 0}
            </option>
          ))}
          <option value="">Add new group</option>
        </Dropdown>
      </div>
    </div>
  );
};
