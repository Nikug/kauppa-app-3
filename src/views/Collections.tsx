import { useEffect, useState } from "react";
import { listenForCollections } from "../firebase/api";
import { getCollections, setSelectedCollection } from "../redux/appSlice";
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

  const [collectionOrder, setCollectionOrder] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    setCollectionOrder(Object.keys(collections));
  }, [collections]);

  const selectCollection = (collectionId: string) => {
    dispatch(setSelectedCollection(collectionId));
  };

  // This will store it to firebase later
  const updateOrder = (newOrder: string[]) => {
    setCollectionOrder(newOrder);
  };

  return (
    <div className="overflow-x-visible">
      <DraggableList
        items={collectionOrder.map((url) => (
          <Collection
            key={url}
            collection={{ url, ...collections[url] }}
            onSelect={selectCollection}
          />
        ))}
        order={collectionOrder}
        updateOrder={updateOrder}
        itemHeight={86}
      />
    </div>
  );
};
