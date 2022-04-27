import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../utils";
import { Dropdown } from "./Dropdown";

export const NavBar = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="sticky top-0 h-16 bg-primary text-white flex items-center px-4 justify-between">
      <div>
        <a className="font-bold text-white text-3xl" href="/">
          {t("AppName")}
        </a>
      </div>
      {user && (
        <div className="font-semibold">
          <Dropdown value={getUsername(user)}>
            <option onClick={logout}>{t("auth.logout")}</option>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
