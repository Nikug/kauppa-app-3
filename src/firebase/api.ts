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
import { setCollections, setGroups, updateGroup } from "../redux/appSlice";
import { Api, TodoCollection, TodoItem } from "../types/todo";
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

export const addCollection = async (collection: Api<TodoCollection>) => {
  const firebase = getDatabase();

  try {
    const newCollection = push(child(ref(firebase), `collections`));
    await set(newCollection, collection);
  } catch (e) {
    console.error(e);
  }
};

export const listenForCollections = () => {
  const firebase = getDatabase();
  const collections = ref(firebase, `collections`);
  const unsubscribe = onValue(collections, (snapshot) => {
    store.dispatch(setCollections({ collections: snapshot.val() }));
  });
  return unsubscribe;
};
