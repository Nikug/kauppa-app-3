import { useEffect } from "react";
import { listenForCollections, setCollectionOrder } from "../firebase/api";
import {
  getCollectionOrder,
  getCollections,
  setSelectedCollection,
} from "../redux/appSlice";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Collection } from "../components/Collection";
import { DraggableList } from "../components/DraggableList";
import { TODO_ITEM_HEIGHT_PX } from "../constants";

export const Collections = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const collections = useAppSelector(getCollections);
  const collectionOrder = useAppSelector(getCollectionOrder);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  const selectCollection = (collectionId: string) => {
    dispatch(setSelectedCollection(collectionId));
  };

  // This will store it to firebase later
  const updateOrder = (newOrder: string[]) => {
    if (!user) return;
    setCollectionOrder(newOrder, user.uid);
  };

  return (
    <div className="overflow-x-visible">
      <DraggableList
        items={collectionOrder.map((url, index) => (
          <Collection
            key={url}
            collection={{ url, ...collections[url] }}
            collectionIndex={index}
            onSelect={selectCollection}
          />
        ))}
        order={collectionOrder}
        updateOrder={updateOrder}
        itemHeight={TODO_ITEM_HEIGHT_PX}
      />
    </div>
  );
};
