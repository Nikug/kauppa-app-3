import {
  getDatabase,
  ref,
  push,
  child,
  set,
  onValue,
  remove,
  update,
  Unsubscribe,
  get,
} from "firebase/database";
import { setCollection, updateGroups } from "../redux/appSlice";
import {
  Api,
  TodoCollection,
  TodoGroup,
  TodoItem,
  UserShare,
} from "../types/todo";
import { store } from "../redux/store";
import { User } from "firebase/auth";
import { emailToKey } from "../utils";

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
    const newCollection = push(child(ref(firebase), "collections"));
    await set(
      ref(firebase, `collectionUsers/${newCollection.key}/${userId}`),
      true
    );
    await set(
      ref(firebase, `userCollections/${userId}/${newCollection.key}`),
      true
    );

    await set(newCollection, collection);
  } catch (e) {
    console.error(e);
  }
};

export const updateCollection = async (collectionId: string, name: string) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `collections/${collectionId}`), { name });
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

export const updateGroup = async (
  collectionId: string,
  groupId: string,
  name: string
) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `groups/${collectionId}/${groupId}`), { name });
  } catch (e) {
    console.error(e);
  }
};

export const listenForCollections = (userId: string) => {
  const firebase = getDatabase();
  const collectionIds = ref(firebase, `userCollections/${userId}`);

  const unsubscribes: Unsubscribe[] = [];
  const unsubscribe = onValue(collectionIds, (snapshot) => {
    snapshot.forEach((collectionId) => {
      const collectionKey = collectionId.key;
      if (!collectionKey) return;
      const collection = ref(firebase, `collections/${collectionId.key}`);

      const collectionUnsubscibe = onValue(collection, (collectionSnapshot) => {
        store.dispatch(
          setCollection({
            collectionId: collectionKey,
            collection: collectionSnapshot.val(),
          })
        );
      });
      unsubscribes.push(collectionUnsubscibe);
    });
  });
  return () => {
    unsubscribe();
    unsubscribes.forEach((unsubscribe) => unsubscribe());
  };
};

export const addUser = async (user: User) => {
  const firebase = getDatabase();

  try {
    if (!user.email) throw new Error("User must have an email");
    await set(ref(firebase, `users/${emailToKey(user.email)}`), {
      uid: user.uid,
      username: user.displayName,
    });
  } catch (e) {
    console.error(e);
  }
};

export const getUserByEmail = async (
  email?: string
): Promise<UserShare | null | undefined> => {
  if (!email) return;
  const firebase = getDatabase();

  try {
    const user = await get(ref(firebase, `users/${emailToKey(email)}`));
    return user.val();
  } catch (e) {
    console.error(e);
  }
};

export const addUserToCollection = async (
  userId: string,
  collectionId: string
) => {
  const firebase = getDatabase();

  try {
    await set(ref(firebase, `collectionUsers/${collectionId}/${userId}`), true);
  } catch (e) {
    console.error(e);
  }
};
