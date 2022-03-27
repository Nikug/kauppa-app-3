export interface TodoItem {
  id: string;
  done: boolean;
  content?: string;
}

export interface TodoGroup {
  name?: string;
  todos?: FirebaseData<TodoItem>;
}

export interface TodoCollection {
  id: string;
  name: string;
  users: FirebaseData<User>;
}

export interface User {
  id: string;
  isOwner?: boolean;
}

export type Api<T> = Omit<T, "id">;
export type FirebaseData<T> = Record<string, Api<T>>;
