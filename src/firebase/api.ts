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
import {
  createOrAdd,
  databaseOrderToList,
  emailKeyToEmail,
  emailToKey,
} from "../utils";

export const addTodo = async (
  collectionId: string,
  groupId: string,
  todo: Api<TodoItem>
) => {
  const firebase = getDatabase();

  try {
    const newTodo = await push(
      child(ref(firebase), `groups/${collectionId}/groups/${groupId}/todos`),
      todo
    );

    await runTransaction(
      ref(firebase, `groups/${collectionId}/groups/${groupId}/todoOrder`),
      (order) => createOrAdd(order, newTodo.key)
    );
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
    await runTransaction(
      ref(firebase, `groups/${collectionId}/groups/${groupId}`),
      (group) => {
        if (!group) return;

        group.todoOrder = Object.values(group.todoOrder).filter(
          (id) => id !== todoId
        );
        delete group?.todos[todoId];
        return group;
      }
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

export const updateTodoOrder = async (
  order: string[],
  collectionId: string,
  groupId: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `groups/${collectionId}/groups/${groupId}/todoOrder`),
      order
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
    const groups = snapshot.val();
    for (const groupId in groups) {
      if (!groups[groupId].todoOrder) continue;
      groups[groupId].todoOrder = databaseOrderToList(
        groups[groupId]?.todoOrder
      );
    }
    store.dispatch(updateGroups({ groups }));
  });

  const orderUnsubscribe = onValue(groupOrder, (snapshot) => {
    const groupOrder = snapshot.val() || [];
    store.dispatch(setReduxGroupOrder(databaseOrderToList(groupOrder)));
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

export const addCollection = async (
  user: User,
  collection: Api<TodoCollection>
) => {
  const firebase = getDatabase();

  try {
    const newCollection = await push(
      ref(firebase, `userCollections/${user.uid}/collections`),
      true
    );

    await set(
      ref(firebase, `collectionUsers/${newCollection.key}/${user.uid}`),
      user.email
    );

    await set(ref(firebase, `collections/${newCollection.key}`), collection);
    await runTransaction(
      ref(firebase, `userCollections/${user.uid}/collectionOrder`),
      (order) => createOrAdd(order, newCollection.key)
    );
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
    const newGroup = await push(
      child(ref(firebase), `groups/${collectionId}/groups`),
      group
    );

    await runTransaction(
      ref(firebase, `groups/${collectionId}/groupOrder`),
      (order) => createOrAdd(order, newGroup.key)
    );

    return newGroup.key;
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

export const updateGroup = async (
  collectionId: string,
  groupId: string,
  name: string
) => {
  const firebase = getDatabase();

  try {
    await update(ref(firebase, `groups/${collectionId}/groups/${groupId}`), {
      name,
    });
  } catch (e) {
    console.error(e);
  }
};

export const setGroupOrder = async (
  groupOrder: string[],
  collectionId: string
) => {
  const firebase = getDatabase();

  try {
    await set(ref(firebase, `groups/${collectionId}/groupOrder`), groupOrder);
  } catch (e) {
    console.error(e);
  }
};

export const listenForCollections = (userId: string) => {
  const firebase = getDatabase();
  const collectionIds = ref(firebase, `userCollections/${userId}/collections`);
  const collectionOrder = ref(
    firebase,
    `userCollections/${userId}/collectionOrder`
  );

  const orderUnsubscribe = onValue(collectionOrder, (snapshot) => {
    const collectionOrder = snapshot.val() || [];
    const orderedIds = databaseOrderToList(collectionOrder);
    store.dispatch(setReduxCollectionOrder(orderedIds));
  });

  const unsubscribes: Unsubscribe[] = [];
  const unsubscribe = onValue(collectionIds, (snapshot) => {
    snapshot.forEach((collectionId) => {
      const collectionKey = collectionId.key;
      if (!collectionKey) return;
      const collection = ref(firebase, `collections/${collectionKey}`);

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
  collectionId: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `collectionUsers/${collectionId}/${user.uid}`),
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
  collectionId: string
) => {
  const firebase = getDatabase();

  try {
    await set(
      ref(firebase, `userCollections/${userId}/collections/${collectionId}`),
      true
    );
    return true;
  } catch (e) {
    console.error(e);
  }
  return false;
};

export const removeCollection = async (
  collectionId: string,
  collectionIndex: number,
  userId: string
) => {
  const firebase = getDatabase();

  try {
    await Promise.all([
      remove(ref(firebase, `collections/${collectionId}`)),
      remove(ref(firebase, `groups/${collectionId}`)),
    ]);
    await remove(
      ref(
        firebase,
        `userCollections/${userId}/collectionOrder/${collectionIndex}`
      )
    );
    await remove(
      ref(firebase, `userCollections/${userId}/collections/${collectionId}`)
    );
    await remove(ref(firebase, `collectionUsers/${collectionId}`));
    store.dispatch(removeReduxCollection(collectionId));
  } catch (e) {
    console.error(e);
  }
};

export const removeGroup = async (
  collectionId: string,
  groupId: string,
  groupIndex: number
) => {
  const firebase = getDatabase();

  try {
    await remove(ref(firebase, `groups/${collectionId}/groups/${groupId}`));
    await remove(
      ref(firebase, `groups/${collectionId}/groupOrder/${groupIndex}`)
    );
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
