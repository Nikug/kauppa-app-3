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
