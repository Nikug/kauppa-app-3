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
  url: string;
  name?: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
}

export type Api<T> = Omit<T, "id">;
export type FirebaseData<T> = Record<string, Api<T>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FirebaseSchema {
  users: {
    [uid: string]: {
      email: string;
      username?: string;
    };
  };
  userCollections: {
    [uid: string]: {
      [collectionId: string]: boolean;
    };
  };
  collections: {
    [collectionId: string]: {
      name?: string;
      url: string;
    };
  };
  groups: {
    [collectionId: string]: {
      [groupId: string]: {
        name?: string;
        todos?: {
          [todoId: string]: {
            done: boolean;
            content?: string;
          };
        };
      };
    };
  };
}
