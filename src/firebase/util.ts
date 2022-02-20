import {
  FirebaseData,
  FirebaseTodoGroup,
  TodoGroup,
  TodoItem,
} from "../types/todo";

export const mapGroups = (
  firebaseGroups: FirebaseData<FirebaseTodoGroup>
): TodoGroup[] => {
  const groups = Object.entries(firebaseGroups).map(([key, value]) => ({
    id: key,
    ...value,
    todos: mapTodos(value.todos),
  }));
  return groups;
};

export const mapGroup = (id: string, firebaseGroup: FirebaseTodoGroup) => ({
  id: id,
  name: firebaseGroup.name,
  todos: mapTodos(firebaseGroup.todos),
});

export const mapTodos = (
  firebaseTodos?: FirebaseData<TodoItem>
): TodoItem[] | undefined => {
  if (!firebaseTodos) return undefined;
  const todos = Object.entries(firebaseTodos).map(([key, value]) => ({
    id: key,
    ...value,
  }));
  return todos;
};
