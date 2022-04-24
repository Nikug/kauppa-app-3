import { getAuth } from "firebase/auth";
import { useEffect, useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Group } from "../components/Group";
import { Button } from "../components/inputs/Button";
import { createNewGroup } from "../components/TodoNavBar";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import {
  addGroup,
  addInvitedCollection,
  listenForGroups,
} from "../firebase/api";
import {
  getCollections,
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
  setSelectedGroup,
} from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EditModal } from "../types/modal";
import { TodoGroup } from "../types/todo";
import { GroupView } from "./GroupView";

export const Groups = () => {
  const groups = useAppSelector(getGroups);
  const collections = useAppSelector(getCollections);
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const dispatch = useAppDispatch();
  const { dispatch: modalDispatch } = useModalContext();

  useEffect(() => {
    if (!selectedCollection?.url) return;
    const unsubscribe = listenForGroups(selectedCollection.url);
    return unsubscribe;
  }, [selectedCollection?.url]);

  const groupList: TodoGroup[] = useMemo(() => {
    if (!groups) return [];
    return Object.entries(groups).map(([id, group]) => ({
      id: id,
      ...group,
    }));
  }, [groups]);

  const handleGroupSelect = (groupId: string) =>
    dispatch(setSelectedGroup(groupId));

  const createGroup = () => {
    if (!selectedCollection) return;
    const newGroup = createNewGroup();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Create list",
        label: "Name",
        value: newGroup.name,
        okButtonText: "Save",
        onOk: (value) =>
          addGroup(selectedCollection.url, { ...newGroup, name: value }),
      })
    );
  };

  const isInvitedCollection = useMemo(() => {
    if (!selectedCollection) return false;
    return !collections[selectedCollection.url];
  }, [selectedCollection, collections]);

  const addInvitedCollectionToOwnCollections = async () => {
    if (!user || !selectedCollection) return;
    const success = await addInvitedCollection(
      user?.uid,
      selectedCollection.url
    );
    if (success) {
      toast.success(`Added to your collections`);
    }
  };

  return (
    <div>
      {!groupList.length && (
        <div className="h-screen flex flex-col justify-center items-center">
          <i className="mb-8">No lists</i>
          <Button className="primary" onClick={createGroup}>
            Create list
          </Button>
        </div>
      )}
      {groups && !selectedGroup && (
        <div>
          {isInvitedCollection && (
            <div className="flex flex-col items-center my-8">
              <p className="mb-2">You have been invited to this collection</p>
              <Button
                className="primary"
                onClick={addInvitedCollectionToOwnCollections}
              >
                Add to your collections
              </Button>
            </div>
          )}
          {groupList?.map((group) => (
            <Group
              key={group.id}
              collectionId={selectedCollection?.url}
              group={group}
              onSelect={(id) => handleGroupSelect(id)}
            />
          ))}
        </div>
      )}
      {groups && selectedGroup && selectedCollection && (
        <GroupView
          group={selectedGroup}
          collectionId={selectedCollection.url}
        />
      )}
    </div>
  );
};
