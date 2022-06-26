import { getAuth } from "firebase/auth";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Group } from "../components/Group";
import { Button } from "../components/inputs/Button";
import { addInvitedCollection, setGroupOrder } from "../firebase/api";
import { setSelectedGroup } from "../redux/appSlice";
import {
  getCollections,
  getGroupOrder,
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
} from "../redux/appSelectors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { DraggableList } from "../components/DraggableList";
import { TODO_ITEM_HEIGHT_PX } from "../constants";

export const Groups = () => {
  const { t } = useTranslation();
  const groups = useAppSelector(getGroups);
  const groupOrder = useAppSelector(getGroupOrder);
  const collections = useAppSelector(getCollections);
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleGroupSelect = (groupId: string) => {
    dispatch(setSelectedGroup(groupId));
    navigate(groupId);
  };

  const isInvitedCollection = useMemo(() => {
    if (!selectedCollection) return false;
    return !collections[selectedCollection.id];
  }, [selectedCollection, collections]);

  const addInvitedCollectionToOwnCollections = async () => {
    if (!user || !selectedCollection) return;
    const success = await addInvitedCollection(
      user?.uid,
      selectedCollection.id
    );
    if (success) {
      toast.success(t("collection.addedToCollections"));
    }
  };

  const updateOrder = (newOrder: string[]) => {
    if (!selectedCollection) return;
    setGroupOrder(newOrder, selectedCollection.id);
  };

  return (
    <div>
      {!selectedGroup && (
        <div>
          {isInvitedCollection && (
            <div className="flex flex-col items-center my-8">
              <p className="mb-2">
                {t("collection.youHaveBeenInvitedToThisCollection")}
              </p>
              <Button
                className="primary"
                onClick={addInvitedCollectionToOwnCollections}
              >
                {t("collection.addToCollections")}
              </Button>
            </div>
          )}
          <DraggableList
            items={groupOrder.map((groupId, index) => (
              <Group
                key={groupId}
                collectionId={selectedCollection?.id}
                group={{ id: groupId, ...groups[groupId] }}
                groupIndex={index}
                onSelect={(id) => handleGroupSelect(id)}
              />
            ))}
            order={groupOrder}
            updateOrder={updateOrder}
            itemHeight={TODO_ITEM_HEIGHT_PX}
          />
        </div>
      )}
    </div>
  );
};
