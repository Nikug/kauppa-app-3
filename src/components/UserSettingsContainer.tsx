import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { listenForUserSettings } from "../firebase/api";
import { getUserSettings } from "../redux/appSelectors";
import { useAppSelector } from "../redux/hooks";

interface Props {
  children?: React.ReactNode;
}

export const UserSettingsContainer = (props: Props) => {
  const { children } = props;
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const userSettings = useAppSelector(getUserSettings);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForUserSettings(user?.uid);
    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    if (!userSettings?.language) return;
    i18n.changeLanguage(userSettings.language);
  }, [userSettings, i18n]);

  return <>{children}</>;
};
