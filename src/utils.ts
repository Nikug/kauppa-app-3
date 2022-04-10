import { User } from "firebase/auth";
import { EMAIL_DOT } from "./constants";
import { TodoGroup } from "./types/todo";

export const getUsername = (user: User) => {
  if (user.displayName) {
    return user.displayName;
  }
  if (user.email) {
    return getNameFromEmail(user.email);
  }
  return "";
};

export const getNameFromEmail = (email: string | null) => {
  if (!email) return "";
  const [name] = email.split("@");
  const capitalizedName = name.split(".").map(capitalizeFirstLetter).join(" ");
  return capitalizedName;
};

export const capitalizeFirstLetter = (text?: string) => {
  if (!text) return "";
  return text[0].toUpperCase() + text.substring(1);
};

export const getTodoCount = (group?: TodoGroup) => {
  if (!group?.todos) return 0;
  const todos = Object.keys(group.todos);
  return todos.length;
};

export const emailToKey = (email: string) => email.replaceAll(".", EMAIL_DOT);
