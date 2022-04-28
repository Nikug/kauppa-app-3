import { useTranslation } from "react-i18next";
import { hideOptions } from "../../redux/appSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "../inputs/Button";
import { LanguageSelector } from "./LanguageSelector";

export const Options = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className="w-content bg-white flex flex-col p-4">
      <h1 className="mb-8">{t("options.title")}</h1>
      <h3>{t("options.language")}</h3>
      <div className="w-fit mb-8">
        <LanguageSelector />
      </div>
      <div>
        <Button className="primary" onClick={() => dispatch(hideOptions())}>
          {t("options.close")}
        </Button>
      </div>
    </div>
  );
};
