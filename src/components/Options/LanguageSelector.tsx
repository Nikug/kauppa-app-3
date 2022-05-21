import { getAuth } from "firebase/auth";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { updateUserLanguage } from "../../firebase/api";
import { Dropdown } from "../Dropdown";

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const sortedLanguages = useMemo(() => {
    const languages = [...i18n.languages];
    return languages.sort();
  }, [i18n.languages]);

  const setLanguage = (language: string) => {
    if (!user?.uid) return;
    i18n.changeLanguage(language);
    updateUserLanguage(user?.uid, language);
  };

  return (
    <Dropdown value={t("languageName").toString()}>
      {sortedLanguages.map((language) => (
        <div key={language} onClick={() => setLanguage(language)}>
          {i18n.getFixedT(language)("languageName").toString()}
        </div>
      ))}
    </Dropdown>
  );
};
