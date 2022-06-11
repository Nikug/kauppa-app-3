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
export const emailKeyToEmail = (email: string) =>
  email.replaceAll(EMAIL_DOT, ".");

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const swap = <T>(list: T[], source: number, target: number) => {
  const result = [...list];
  [result[source], result[target]] = [result[target], result[source]];
  return result;
};

export const move = <T>(arr: Readonly<T[]>, from: number, to: number) => {
  const arrayCopy = [...arr];
  arrayCopy.splice(to, 0, arrayCopy.splice(from, 1)[0]);
  return arrayCopy;
};

export const createOrAdd = <T>(
  arr: Readonly<T[]> | undefined | null,
  item: T
) => {
  if (!arr) {
    return [item];
  } else {
    return [...arr, item];
  }
};
