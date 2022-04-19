import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { listenForCollections } from "../firebase/api";
import { getCollections, setSelectedCollection } from "../redux/appSlice";
import { TodoCollection } from "../types/todo";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch } from "../redux/hooks";
import { Collection } from "../components/Collection";

export const Collections = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const collections = useSelector(getCollections);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  const collectionList: TodoCollection[] = useMemo(() => {
    return Object.entries(collections).map(([url, collection]) => ({
      url,
      ...collection,
    }));
  }, [collections]);

  const selectCollection = (collectionId: string) => {
    dispatch(setSelectedCollection(collectionId));
  };

  return (
    <div>
      <div className="text-black">
        {collectionList.map((collection) => (
          <Collection
            key={collection.url}
            collection={collection}
            onSelect={selectCollection}
          />
        ))}
      </div>
    </div>
  );
};
