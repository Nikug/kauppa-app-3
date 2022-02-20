import { getDatabase, ref, push, child, set, onValue } from "firebase/database";
import { updateGroup } from "../redux/appSlice";
import { TodoItem } from "../types/todo";
import { store } from "../redux/store";

export const addTodo = (groupId: string, todo: TodoItem) => {
  const firebase = getDatabase();

  const newTodo = push(child(ref(firebase), `groups/${groupId}/todos`));
  set(newTodo, todo);
};

export const listenForGroup = (groupId: string) => {
  const firebase = getDatabase();
  const group = ref(firebase, `groups/${groupId}`);
  const unsubscribe = onValue(group, (snapshot) => {
    const newGroup = snapshot.val();
    console.log(newGroup);
    // store.dispatch(updateGroup({ group: newGroup }));
  });
  return unsubscribe;
};
