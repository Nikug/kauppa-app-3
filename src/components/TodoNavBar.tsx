import { HomeIcon, PencilIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import humanId from "human-id";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { COLLECTION_URL } from "../constants";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { addCollection, addGroup } from "../firebase/api";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
  setSelectedGroup,
} from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EditModal } from "../types/modal";
import { Api, TodoCollection, TodoGroup } from "../types/todo";
import { getTodoCount } from "../utils";
import { Dropdown } from "./Dropdown";
import { TextButton } from "./inputs/TextButton";

export const createNewGroup = (): Api<TodoGroup> => ({
  name: "",
});

const createNewCollection = (): TodoCollection => {
  const url = humanId({ separator: "-", capitalize: false });
  return {
    url,
    name: "",
  };
};

const navClasses = `
  sticky
  top-0
  h-16
  bg-primary
  text-white
  flex
  items-center
  px-2
  justify-between
`;

export const TodoNavBar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const groups = useAppSelector(getGroups);
  const { dispatch: modalDispatch } = useModalContext();

  const createGroup = () => {
    if (!selectedCollection) return;
    const newGroup = createNewGroup();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Create group",
        label: "Name",
        okButtonText: "Save",
        value: newGroup.name,
        onOk: (value) =>
          addGroup(selectedCollection.url, { ...newGroup, name: value }),
      })
    );
  };

  const createCollection = () => {
    if (!user) return;
    const newCollection = createNewCollection();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Create collection",
        label: "Name",
        okButtonText: "Save",
        onOk: (value) =>
          addCollection(user.uid, { ...newCollection, name: value }),
      })
    );
  };

  const groupList: TodoGroup[] = useMemo(() => {
    if (!groups) return [];
    return Object.entries(groups).map(([id, group]) => ({
      id: id,
      ...group,
    }));
  }, [groups]);

  const handleGroupSelect = (groupId: string) => {
    dispatch(setSelectedGroup(groupId));
  };

  const title = useMemo(() => {
    if (!selectedCollection) return "Collections";
    if (selectedGroup) return selectedGroup.name;
    return selectedCollection.name;
  }, [selectedCollection, selectedGroup]);

  const todoCount = (group: TodoGroup) => getTodoCount(group);

  return (
    <div className={navClasses}>
      <a className="font-bold text-white text-xl truncate flex-1" href={"/"}>
        {<HomeIcon className="w-8 h-8" />}
      </a>
      <a
        className="font-bold text-white text-xl text-center truncate flex-1"
        href={COLLECTION_URL}
      >
        {title}
      </a>
      {user && !selectedCollection && (
        <div className="flex-1 text-right">
          <TextButton onClick={createCollection}>Add collection</TextButton>
        </div>
      )}
      {user && selectedCollection && !groupList && (
        <div className="flex-1 text-right">
          <TextButton onClick={createGroup}>Add group</TextButton>
        </div>
      )}
      {user && selectedCollection && (
        <div className="font-semibold flex-1">
          <Dropdown
            value={selectedGroup ? selectedGroup.name : "Select a group"}
          >
            {groupList?.map((group) => (
              <div key={group.id} onClick={() => handleGroupSelect(group.id)}>
                {group.name} {todoCount(group) ? `(${todoCount(group)})` : ""}
              </div>
            ))}
            <div onClick={createGroup}>
              Add new group <PencilIcon className="h-4 w-4 inline text-icon" />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
