import { useEffect, useMemo } from "react";
import { listenForCollections } from "../firebase/api";
import { getCollections, setSelectedCollection } from "../redux/appSlice";
import { TodoCollection } from "../types/todo";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Collection } from "../components/Collection";
import { DraggableList } from "../components/DraggableList";

export const Collections = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const collections = useAppSelector(getCollections);

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
    <div className="overflow-x-visible">
      <DraggableList
        items={collectionList.map((collection) => (
          <Collection
            key={collection.url}
            collection={collection}
            onSelect={selectCollection}
          />
        ))}
        itemHeight={86}
      />
    </div>
  );
};
