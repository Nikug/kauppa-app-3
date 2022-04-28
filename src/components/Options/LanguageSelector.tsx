import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "../Dropdown";

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const sortedLanguages = useMemo(() => {
    const languages = [...i18n.languages];
    return languages.sort();
  }, [i18n.languages]);

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Dropdown value={t("languageName").toString()}>
      {sortedLanguages.map((language) => (
        <div key={language} onClick={() => setLanguage(language)}>
          {i18n.getFixedT(language)("languageName")}
        </div>
      ))}
    </Dropdown>
  );
};
