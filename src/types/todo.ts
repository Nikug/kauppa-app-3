export interface TodoItem {
  id: string;
  done: boolean;
  content?: string;
}

export interface TodoGroup {
  id: string;
  name?: string;
  todoOrder?: OrderedId[];
  todos?: FirebaseData<TodoItem>;
}

export interface TodoCollection {
  id: string;
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

export interface OrderedId {
  id: string;
  order: number;
}

export type Api<T> = Omit<T, "id">;
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
    [collectionId: string]: {
      [userId: string]: string; // Email
    };
  };
  // Used for fetching all user collections
  userCollections: {
    [userId: string]: {
      collectionOrder: OrderedId[];
      collections: {
        [collectionId: string]: boolean;
      };
    };
  };
  collections: {
    [collectionId: string]: {
      name: string;
    };
  };
  groups: {
    [collectionId: string]: {
      groupOrder: OrderedId[];
      groups: {
        [groupId: string]: {
          name?: string;
          todoOrder?: OrderedId[];
          todos?: {
            [todoId: string]: {
              done: boolean;
              content?: string;
            };
          };
        };
      };
    };
  };
}
