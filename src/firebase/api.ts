import {
  getDatabase,
  ref,
  push,
  child,
  set,
  onValue,
  get,
  remove,
} from "firebase/database";
import { setGroups, updateGroup } from "../redux/appSlice";
import { Api, TodoItem } from "../types/todo";
import { store } from "../redux/store";

export const addTodo = async (groupId: string, todo: Api<TodoItem>) => {
  const firebase = getDatabase();

  try {
    const newTodo = push(child(ref(firebase), `groups/${groupId}/todos`));
    await set(newTodo, todo);
  } catch (e) {
    console.error(e);
  }
};

export const removeTodo = async (groupId: string, todoId: string) => {
  const firebase = getDatabase();

  try {
    await remove(ref(firebase, `groups/${groupId}/todos/${todoId}`));
  } catch (e) {
    console.error(e);
  }
};

export const updateTodo = async (groupId: string, todo: TodoItem) => {
  const firebase = getDatabase();

  try {
    const { id, ...rest } = todo;
    await set(ref(firebase, `groups/${groupId}/todos/${id}`), rest);
  } catch (e) {
    console.error(e);
  }
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
  try {
    const groupsSnapshot = await get(child(ref(firebase), "groups"));
    if (groupsSnapshot.exists()) {
      store.dispatch(setGroups({ groups: groupsSnapshot.val() }));
    }
  } catch (e) {
    console.error(e);
  }
};
