export interface TodoItem {
  id: string;
  done: boolean;
  content?: string;
}

export interface TodoGroup {
  id: string;
  name?: string;
  todos?: TodoItem[];
}

export interface FirebaseTodoGroup {
  name?: string;
  todos?: FirebaseData<TodoItem>;
}

export type Api<T> = Omit<T, "id">;
export type FirebaseData<T> = Record<string, Api<T>>;
