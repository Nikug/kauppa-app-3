export interface TodoItem {
  id: string;
  content?: string;
}

export interface TodoGroup {
  id: string;
  name?: string;
  todos?: TodoItem[];
}
