import { useTranslation } from "react-i18next";
import { hideOptions } from "../../redux/appSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button } from "../inputs/Button";
import { LanguageSelector } from "./LanguageSelector";

export const Options = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className="w-content m-auto bg-white flex flex-col">
      <h1 className="mb-4">{t("options.title")}</h1>
      <div className="w-fit mb-4">
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
