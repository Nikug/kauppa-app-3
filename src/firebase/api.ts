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
import {
  setCollection,
  removeCollection as removeReduxCollection,
  removeGroup as removeReduxGroup,
  updateGroups,
} from "../redux/appSlice";
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
  collection: TodoCollection
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `collectionUsers/${collection.url}/${userId}`),
      true
    );
    await set(
      ref(firebase, `userCollections/${userId}/${collection.url}`),
      true
    );
    await set(ref(firebase, `collections/${collection.url}`), collection);
  } catch (e) {
    console.error(e);
  }
};

export const updateCollection = async (collectionUrl: string, name: string) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `collections/${collectionUrl}`), { name });
  } catch (e) {
    console.error(e);
  }
};

export const addGroup = async (
  collectionurl: string,
  group: Api<TodoGroup>
) => {
  const firebase = getDatabase();

  try {
    const newGroup = push(child(ref(firebase), `groups/${collectionurl}`));
    await set(ref(firebase, `groups/${collectionurl}/${newGroup.key}`), group);
  } catch (e) {
    console.error(e);
  }
};

export const updateGroup = async (
  collectionUrl: string,
  groupId: string,
  name: string
) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `groups/${collectionUrl}/${groupId}`), { name });
  } catch (e) {
    console.error(e);
  }
};

export const listenForCollections = (userId: string) => {
  const firebase = getDatabase();
  const collectionUrls = ref(firebase, `userCollections/${userId}`);

  const unsubscribes: Unsubscribe[] = [];
  const unsubscribe = onValue(collectionUrls, (snapshot) => {
    snapshot.forEach((collectionUrl) => {
      const collectionKey = collectionUrl.key;
      if (!collectionKey) return;
      const collection = ref(firebase, `collections/${collectionUrl.key}`);

      const collectionUnsubscibe = onValue(collection, (collectionSnapshot) => {
        store.dispatch(
          setCollection({
            collectionUrl: collectionKey,
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
  collectionUrl: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `collectionUsers/${collectionUrl}/${userId}`),
      true
    );
  } catch (e) {
    console.error(e);
  }
};

export const addInvitedCollection = async (
  userId: string,
  collectionUrl: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `userCollections/${userId}/${collectionUrl}`),
      true
    );
    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const removeCollection = async (
  collectionUrl: string,
  userId: string
) => {
  const firebase = getDatabase();

  try {
    await Promise.all([
      remove(ref(firebase, `collections/${collectionUrl}`)),
      remove(ref(firebase, `groups/${collectionUrl}`)),
      remove(ref(firebase, `userCollections/${userId}/${collectionUrl}`)),
      remove(ref(firebase, `collectionUsers/${collectionUrl}`)),
    ]);
    store.dispatch(removeReduxCollection(collectionUrl));
  } catch (e) {
    console.error(e);
  }
};

export const removeGroup = async (collectionUrl: string, groupId: string) => {
  const firebase = getDatabase();

  try {
    await remove(ref(firebase, `groups/${collectionUrl}/${groupId}`));
    store.dispatch(removeReduxGroup(groupId));
  } catch (e) {
    console.error(e);
  }
};
