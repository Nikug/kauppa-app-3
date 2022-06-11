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
  runTransaction,
} from "firebase/database";
import {
  setCollection,
  removeCollection as removeReduxCollection,
  removeGroup as removeReduxGroup,
  updateGroups,
  updateUserSettings,
  setCollectionOrder as setReduxCollectionOrder,
  setGroupOrder as setReduxGroupOrder,
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
import { emailKeyToEmail, emailToKey } from "../utils";

export const addTodo = async (
  collectionId: string,
  groupId: string,
  todo: Api<TodoItem>
) => {
  const firebase = getDatabase();

  try {
    const newTodo = push(
      child(ref(firebase), `groups/${collectionId}/groups/${groupId}/todos`)
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
      ref(firebase, `groups/${collectionId}/groups/${groupId}/todos/${todoId}`)
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
      ref(firebase, `groups/${collectionId}/groups/${groupId}/todos/${id}`),
      rest
    );
  } catch (e) {
    console.error(e);
  }
};

export const listenForGroups = (collectionId: string) => {
  const firebase = getDatabase();
  const groups = ref(firebase, `groups/${collectionId}/groups`);
  const groupOrder = ref(firebase, `groups/${collectionId}/groupOrder`);

  const unsubscribe = onValue(groups, (snapshot) => {
    store.dispatch(updateGroups({ groups: snapshot.val() }));
  });

  const orderUnsubscribe = onValue(groupOrder, (snapshot) => {
    const groupOrder = snapshot.val() || [];
    store.dispatch(setReduxGroupOrder(Object.values(groupOrder)));
  });

  return () => {
    unsubscribe();
    orderUnsubscribe();
  };
};

export const setCollectionOrder = async (
  collectionOrder: string[],
  userId: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `userCollections/${userId}/collectionOrder`),
      collectionOrder
    );
  } catch (e) {
    console.error(e);
  }
};

export const addCollection = async (user: User, collection: TodoCollection) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `collectionUsers/${collection.url}/${user.uid}`),
      user.email
    );
    await set(
      ref(
        firebase,
        `userCollections/${user.uid}/collections/${collection.url}`
      ),
      true
    );

    runTransaction(
      ref(firebase, `userCollections/${user.uid}/collectionOrder`),
      (order) => {
        if (!order) {
          order = [collection.url];
        } else {
          order.push(collection.url);
        }
        return order;
      }
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
  collectionUrl: string,
  group: Api<TodoGroup>
) => {
  const firebase = getDatabase();

  try {
    const newGroup = push(
      child(ref(firebase), `groups/${collectionUrl}/groups`),
      group
    );

    runTransaction(
      ref(firebase, `groups/${collectionUrl}/groupOrder`),
      (order) => {
        if (!order) {
          order = [newGroup.key];
        } else {
          order.push(newGroup.key);
        }
        return order;
      }
    );

    return newGroup.key;
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const updateGroup = async (
  collectionUrl: string,
  groupId: string,
  name: string
) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `groups/${collectionUrl}/groups/${groupId}`), {
      name,
    });
  } catch (e) {
    console.error(e);
  }
};

export const setGroupOrder = async (
  groupOrder: string[],
  collectionUrl: string
) => {
  const firebase = getDatabase();

  try {
    await set(ref(firebase, `groups/${collectionUrl}/groupOrder`), groupOrder);
  } catch (e) {
    console.error(e);
  }
};

export const listenForCollections = (userId: string) => {
  const firebase = getDatabase();
  const collectionUrls = ref(firebase, `userCollections/${userId}/collections`);
  const collectionOrder = ref(
    firebase,
    `userCollections/${userId}/collectionOrder`
  );

  const orderUnsubscribe = onValue(collectionOrder, (snapshot) => {
    const collectionOrder = snapshot.val() || [];
    store.dispatch(setReduxCollectionOrder(Object.values(collectionOrder)));
  });

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
    orderUnsubscribe();
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
    if (!user.key) return;

    return { ...user.val(), email: emailKeyToEmail(user.key) };
  } catch (e) {
    console.error(e);
  }
};

export const addUserToCollection = async (
  user: UserShare,
  collectionUrl: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `collectionUsers/${collectionUrl}/${user.uid}`),
      user.email
    );
    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const addInvitedCollection = async (
  userId: string,
  collectionUrl: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `userCollections/${userId}/collections/${collectionUrl}`),
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
  collectionIndex: number,
  userId: string
) => {
  const firebase = getDatabase();

  try {
    await Promise.all([
      remove(ref(firebase, `collections/${collectionUrl}`)),
      remove(ref(firebase, `groups/${collectionUrl}`)),
      remove(
        ref(
          firebase,
          `userCollections/${userId}/collectionOrder/${collectionIndex}`
        )
      ),
      remove(
        ref(firebase, `userCollections/${userId}/collections/${collectionUrl}`)
      ),
    ]);
    await remove(ref(firebase, `collectionUsers/${collectionUrl}`));
    store.dispatch(removeReduxCollection(collectionUrl));
  } catch (e) {
    console.error(e);
  }
};

export const removeGroup = async (
  collectionUrl: string,
  groupId: string,
  groupIndex: number
) => {
  const firebase = getDatabase();

  try {
    await remove(ref(firebase, `groups/${collectionUrl}/groups/${groupId}`));
    await remove(
      ref(firebase, `groups/${collectionUrl}/groupOrder/${groupIndex}`)
    );
    store.dispatch(removeReduxGroup(groupId));
  } catch (e) {
    console.error(e);
  }
};

export const listenForUserSettings = (userId: string) => {
  const firebase = getDatabase();
  const userSettings = ref(firebase, `userSettings/${userId}`);
  const unsubscribe = onValue(userSettings, (snapshot) => {
    store.dispatch(updateUserSettings(snapshot.val()));
  });
  return unsubscribe;
};

export const updateUserLanguage = async (userId: string, language: string) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `userSettings/${userId}`), { language });
  } catch (e) {
    console.error(e);
  }
};
