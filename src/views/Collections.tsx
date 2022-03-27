import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components/inputs/Button";
import { addCollection, listenForCollections } from "../firebase/api";
import { getCollections } from "../redux/appSlice";
import { Api, TodoCollection } from "../types/todo";
import humanId from "human-id";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const createNewCollection = (userId: string): Api<TodoCollection> => ({
  url: humanId({ separator: "-", capitalize: false }),
  name: "",
  users: {
    [userId]: {
      isOwner: true,
    },
  },
});

export const Collections = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const collections = useSelector(getCollections);

  useEffect(() => {
    const unsubscribe = listenForCollections();
    return unsubscribe;
  }, []);

  const collectionList: TodoCollection[] = useMemo(() => {
    return Object.entries(collections).map(([id, collection]) => ({
      id: id,
      ...collection,
    }));
  }, [collections]);

  const createCollection = () => {
    if (!user) return;
    const newCollection = createNewCollection(user.uid);
    addCollection(newCollection);
  };

  return (
    <div>
      <div>
        <Button className="primary" onClick={createCollection}>
          Add collection
        </Button>
      </div>
      <div>
        {collectionList.map((collection) => (
          <h2>{collection.name}</h2>
        ))}
      </div>
    </div>
  );
};
