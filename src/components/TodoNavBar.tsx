import { HomeIcon, PencilIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import humanId from "human-id";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        title: t("modal.createList"),
        label: t("modal.name"),
        okButtonText: t("modal.save"),
        value: newGroup.name,
        onOk: async (value) => {
          const newKey = await addGroup(selectedCollection.url, {
            ...newGroup,
            name: value,
          });
          if (newKey) {
            dispatch(setSelectedGroup(newKey));
          }
        },
      })
    );
  };

  const createCollection = () => {
    if (!user) return;
    const newCollection = createNewCollection();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: t("modal.createCollection"),
        label: t("modal.name"),
        okButtonText: t("modal.save"),
        onOk: (value) => addCollection(user, { ...newCollection, name: value }),
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
    if (!selectedCollection) return t("collection.title");
    if (selectedGroup) return selectedGroup.name || t("general.noName");
    return selectedCollection.name || t("general.noName");
  }, [selectedCollection, selectedGroup, t]);

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
          <TextButton onClick={createCollection}>
            {t("collection.add")}
          </TextButton>
        </div>
      )}
      {user && selectedCollection && !groupList && (
        <div className="flex-1 text-right">
          <TextButton onClick={createGroup}>{t("list.add")}</TextButton>
        </div>
      )}
      {user && selectedCollection && (
        <div className="font-semibold flex-1">
          <Dropdown
            value={
              selectedGroup
                ? selectedGroup.name || t("general.noName")
                : t("list.select")
            }
          >
            {groupList?.map((group) => (
              <div key={group.id} onClick={() => handleGroupSelect(group.id)}>
                {group.name || t("general.noName")}{" "}
                {todoCount(group) ? `(${todoCount(group)})` : ""}
              </div>
            ))}
            <div onClick={createGroup}>
              {t("list.add")}
              <PencilIcon className="ml-2 h-5 w-5 inline text-icon" />
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
