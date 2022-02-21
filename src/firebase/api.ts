import {
  getDatabase,
  ref,
  push,
  child,
  set,
  onValue,
  get,
} from "firebase/database";
import { setGroups, updateGroup } from "../redux/appSlice";
import { Api, TodoItem } from "../types/todo";
import { store } from "../redux/store";

export const addTodo = (groupId: string, todo: Api<TodoItem>) => {
  const firebase = getDatabase();

  const newTodo = push(child(ref(firebase), `groups/${groupId}/todos`));
  set(newTodo, todo);
};

export const listenForGroup = (groupId: string) => {
  const firebase = getDatabase();
  const group = ref(firebase, `groups/${groupId}`);
  const unsubscribe = onValue(group, (snapshot) => {
    store.dispatch(updateGroup({ groupId: groupId, group: snapshot.val() }));
  });
  return unsubscribe;
};

export const getGroups = async (route: string) => {
  const firebase = getDatabase();
  const groupsSnapshot = await get(child(ref(firebase), "groups"));
  if (groupsSnapshot.exists()) {
    store.dispatch(setGroups({ groups: groupsSnapshot.val() }));
  }
};
