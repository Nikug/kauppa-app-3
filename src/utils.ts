export const getNameFromEmail = (email: string | null) => {
  if (!email) return "";
  const [name] = email.split("@");
  const capitalizedName = name
    .split(".")
    .map((part) => part[0].toUpperCase() + part.substring(1))
    .join(" ");
  return capitalizedName;
};
