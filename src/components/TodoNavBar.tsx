import { getAuth } from "firebase/auth";
import humanId from "human-id";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addGroup } from "../firebase/api";
import {
  getGroups,
  getSelectedCollection,
  getSelectedGroup,
  setSelectedGroup,
} from "../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Api, TodoGroup } from "../types/todo";
import { Dropdown } from "./Dropdown";

const createNewGroup = (): Api<TodoGroup> => ({
  name: humanId({ separator: "-", capitalize: false }),
});

export const TodoNavBar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const selectedGroup = useAppSelector(getSelectedGroup);
  const groups = useAppSelector(getGroups);

  const createGroup = () => {
    if (!selectedCollection) return;
    const newGroup = createNewGroup();
    addGroup(selectedCollection.id, newGroup);
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

  return (
    <div className="sticky top-0 h-16 bg-primary text-white flex items-center px-4 justify-between">
      <div>
        <a className="font-bold text-white text-3xl" href="/">
          {selectedCollection?.name}
        </a>
      </div>
      {user && (
        <div className="font-semibold">
          <Dropdown
            value={selectedGroup ? selectedGroup.name : "Select a group"}
          >
            {groupList?.map((group) => (
              <option
                key={group.id}
                onClick={() => handleGroupSelect(group.id)}
              >
                {group.name} todos:{" "}
                {Object.values(group?.todos ?? {}).length ?? 0}
              </option>
            ))}
            <option value="" onClick={createGroup}>
              Add new group
            </option>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
