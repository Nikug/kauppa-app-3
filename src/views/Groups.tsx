import { getAuth } from "firebase/auth";
import humanId from "human-id";
import { useEffect, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { Button } from "../components/inputs/Button";
import { addGroup, listenForGroups } from "../firebase/api";
import { getCollection, getGroups } from "../redux/appSlice";
import { useAppSelector } from "../redux/hooks";
import { Api, TodoGroup } from "../types/todo";
import { listenForCollections } from "../firebase/api";

const createNewGroup = (): Api<TodoGroup> => ({
  name: humanId({ separator: "-", capitalize: false }),
});

export const Groups = () => {
  const { id: collectionUrl } = useParams<{ id: string }>();
  const auth = getAuth();
  const [user] = useAuthState(auth);

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
        {groupList.map((group) => (
          <div key={group.id}>
            {group.name} todos: {Object.values(group?.todos ?? {}).length ?? 0}
          </div>
        ))}
      </div>
    </div>
  );
};
