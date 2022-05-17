import { HomeIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { COLLECTION_URL } from "../constants";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
  setSelectedGroup,
} from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TodoGroup } from "../types/todo";
import { getTodoCount } from "../utils";
import { navClasses } from "./CollectionNavbar";
import { Dropdown } from "./Dropdown";

export const GroupNavbar = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const groups = useAppSelector(getGroups);

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

  const onTitleClick = () => {
    dispatch(setSelectedGroup(null));
  };

  const title = useMemo(() => {
    return selectedGroup?.name || t("general.noName");
  }, [selectedGroup, t]);

  const todoCount = (group: TodoGroup) => getTodoCount(group);

  return (
    <div className={navClasses}>
      <Link
        className="font-bold text-white text-xl truncate flex-1"
        to={"/"}
        onClick={onTitleClick}
      >
        {<HomeIcon className="w-8 h-8" />}
      </Link>
      <Link
        className="font-bold text-white text-xl text-center truncate flex-1"
        to={`${COLLECTION_URL}/${selectedCollection?.url}`}
        onClick={onTitleClick}
      >
        {title}
      </Link>
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
          </Dropdown>
        </div>
      )}
    </div>
  );
};
