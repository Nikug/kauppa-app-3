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
  url: string;
  name?: string;
}

export interface UserShare {
  uid: string;
  email: string;
  username?: string;
}

export interface UserSettings {
  language?: string;
}

export type Api<T> = Omit<T, "id" | "url">;
export type FirebaseData<T> = Record<string, Api<T>>;

export interface AppOptions {
  show: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FirebaseSchema {
  users: {
    [email: string]: {
      uid: string;
      username?: string;
    };
  };
  userSettings: {
    [userId: string]: {
      language?: string;
    };
  };
  // Used for data access rules
  collectionUsers: {
    [collectionUrl: string]: {
      [userId: string]: string; // Email
    };
  };
  // Used for fetching all user collections
  userCollections: {
    [userId: string]: {
      [collectionUrl: string]: boolean;
    };
  };
  collections: {
    [collectionUrl: string]: {
      name: string;
    };
  };
  groups: {
    [collectionUrl: string]: {
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
