import {
  getDatabase,
  ref,
  push,
  child,
  set,
  onValue,
  remove,
} from "firebase/database";
import { setCollection, updateGroups } from "../redux/appSlice";
import { Api, TodoCollection, TodoGroup, TodoItem } from "../types/todo";
import { store } from "../redux/store";

export const addTodo = async (
  collectionId: string,
  groupId: string,
  todo: Api<TodoItem>
) => {
  const firebase = getDatabase();

  try {
    const newTodo = push(
      child(ref(firebase), `groups/${collectionId}/${groupId}/todos`)
    );
    await set(newTodo, todo);
  } catch (e) {
    console.error(e);
  }
};

export const removeTodo = async (
  collectionId: string,
  groupId: string,
  todoId: string
) => {
  const firebase = getDatabase();

  try {
    await remove(
      ref(firebase, `groups/${collectionId}/${groupId}/todos/${todoId}`)
    );
  } catch (e) {
    console.error(e);
  }
};

export const updateTodo = async (
  collectionId: string,
  groupId: string,
  todo: TodoItem
) => {
  const firebase = getDatabase();

  try {
    const { id, ...rest } = todo;
    await set(
      ref(firebase, `groups/${collectionId}/${groupId}/todos/${id}`),
      rest
    );
  } catch (e) {
    console.error(e);
  }
};

export const listenForGroups = (collectionId: string) => {
  const firebase = getDatabase();
  const groups = ref(firebase, `groups/${collectionId}`);
  const unsubscribe = onValue(groups, (snapshot) => {
    store.dispatch(updateGroups({ groups: snapshot.val() }));
  });
  return unsubscribe;
};

export const addCollection = async (
  userId: string,
  collection: Api<TodoCollection>
) => {
  const firebase = getDatabase();

  try {
    const newUserCollection = push(
      child(ref(firebase), `userCollections/${userId}`)
    );
    await set(newUserCollection, true);

    await set(
      ref(firebase, `collections/${newUserCollection.key}`),
      collection
    );
  } catch (e) {
    console.error(e);
  }
};

export const addGroup = async (collectionId: string, group: Api<TodoGroup>) => {
  const firebase = getDatabase();

  try {
    const newGroup = push(child(ref(firebase), `groups/${collectionId}`));
    await set(ref(firebase, `groups/${collectionId}/${newGroup.key}`), group);
  } catch (e) {
    console.error(e);
  }
};

export const listenForCollections = (userId: string) => {
  const firebase = getDatabase();
  const collectionIds = ref(firebase, `userCollections/${userId}`);
  const unsubscribe = onValue(collectionIds, (snapshot) => {
    snapshot.forEach((collectionId) => {
      const collectionKey = collectionId.key;
      if (!collectionKey) return;
      const collection = ref(firebase, `collections/${collectionId.key}`);

      onValue(collection, (collectionSnapshot) => {
        store.dispatch(
          setCollection({
            collectionId: collectionKey,
            collection: collectionSnapshot.val(),
          })
        );
      });
    });
  });
  return unsubscribe;
};
