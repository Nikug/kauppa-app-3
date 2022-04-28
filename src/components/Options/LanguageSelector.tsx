import { useTranslation } from "react-i18next";
import { Dropdown } from "../Dropdown";

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Dropdown value={t("languageName").toString()}>
      {i18n.languages.map((language) => (
        <div key={language} onClick={() => setLanguage(language)}>
          {language}
        </div>
      ))}
    </Dropdown>
  );
};
