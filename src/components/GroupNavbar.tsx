import { ArrowLeftIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { COLLECTION_URL } from "../constants";
import { setSelectedGroup } from "../redux/appSlice";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
} from "../redux/appSelectors";
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
  const navigate = useNavigate();

  const groupList: TodoGroup[] = useMemo(() => {
    if (!groups) return [];
    return Object.entries(groups).map(([id, group]) => ({
      id: id,
      ...group,
    }));
  }, [groups]);

  const handleGroupSelect = (groupId: string) => {
    if (!selectedCollection) return;
    dispatch(setSelectedGroup(groupId));
    navigate(`${COLLECTION_URL}/${selectedCollection.url}/${groupId}`);
  };

  const onBack = () => {
    dispatch(setSelectedGroup(null));
  };

  const todoCount = (group: TodoGroup) => getTodoCount(group);

  return (
    <div className={navClasses}>
      <h4 className="h-8 font-bold flex items-center">{t("todo.title")}</h4>
      <div className="h-12 w-full px-2 flex justify-between items-center">
        <Link
          className="font-bold text-white text-xl truncate flex-1"
          to={`${COLLECTION_URL}/${selectedCollection?.url}`}
          onClick={onBack}
        >
          {<ArrowLeftIcon className="w-7 h-7" />}
        </Link>
        {user && selectedCollection && (
          <div className="font-semibold text-xl flex-1 flex justify-center">
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
        <div className="flex-1 h-2"></div>
      </div>
    </div>
  );
};
