import { setCollectionOrder } from "../firebase/api";
import { setSelectedCollection } from "../redux/appSlice";
import { getCollectionOrder, getCollections } from "../redux/appSelectors";
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

  const selectCollection = (collectionId: string) => {
    dispatch(setSelectedCollection(collectionId));
  };

  const updateOrder = (newOrder: string[]) => {
    if (!user) return;
    setCollectionOrder(newOrder, user.uid);
  };

  return (
    <div className="overflow-x-visible">
      <DraggableList
        items={collectionOrder.map((id, index) => (
          <Collection
            key={id}
            collection={{ id, ...collections[id] }}
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
