import { User } from "firebase/auth";

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
