export interface TodoItem {
  id: string;
  done: boolean;
  content?: string;
}

export interface TodoGroup {
  id: string;
  name?: string;
  todos?: FirebaseData<TodoItem>;
}

export interface TodoCollection {
  id: string;
  url: string;
  name?: string;
}

export type Api<T> = Omit<T, "id">;
export type FirebaseData<T> = Record<string, Api<T>>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FirebaseSchema {
  users: {
    [email: string]: {
      uid: string;
      username?: string;
    };
  };
  // Used for data access rules
  collectionUsers: {
    [collectionId: string]: {
      [userId: string]: boolean;
    };
  };
  // Used for fetching all user collections
  userCollections: {
    [userId: string]: {
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
