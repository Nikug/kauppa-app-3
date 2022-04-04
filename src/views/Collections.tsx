import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/inputs/Button";
import { addCollection, listenForCollections } from "../firebase/api";
import { getCollections } from "../redux/appSlice";
import { Api, TodoCollection } from "../types/todo";
import humanId from "human-id";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const createNewCollection = (userId: string): Api<TodoCollection> => {
  const url = humanId({ separator: "-", capitalize: false });
  return {
    url,
    name: url,
  };
};

export const Collections = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const collections = useSelector(getCollections);
  console.log(collections);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  const collectionList: TodoCollection[] = useMemo(() => {
    return Object.entries(collections).map(([id, collection]) => ({
      id: id,
      ...collection,
    }));
  }, [collections]);

  const createCollection = () => {
    if (!user) return;
    const newCollection = createNewCollection(user.uid);
    addCollection(user.uid, newCollection);
  };

  return (
    <div>
      <div>
        <Button className="primary" onClick={createCollection}>
          Add collection
        </Button>
      </div>
      <div className="text-black">
        {collectionList.map((collection) => (
          <h2 key={collection.id}>
            {collection.name} {collection.url}
          </h2>
        ))}
      </div>
    </div>
  );
};
