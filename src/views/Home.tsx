import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { LinkButton } from "../components/inputs/LinkButton";
import { COLLECTION_URL } from "../constants";
import { getUsername } from "../utils";

export const Home = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>{t("general.loading")}</div>;
  }

  return (
    <div className="w-full flex justify-center text-center py-8">
      {user && (
        <div className="flex flex-col align-center mt-8">
          <h2 className="mb-8">
            {t("home.userGreeting", { user: getUsername(user) })}
          </h2>
          <LinkButton className="primary" href={COLLECTION_URL}>
            {t("home.goToCollections")}
          </LinkButton>
        </div>
      )}
      {!user && (
        <div className="w-full flex flex-col px-32">
          <h1 className="mb-32">{t("home.greeting")}</h1>
          <LinkButton className="primary mb-6" href="/login">
            {t("auth.login")}
          </LinkButton>
          <LinkButton className="secondary" href="/register">
            {t("auth.register")}
          </LinkButton>
        </div>
      )}
    </div>
  );
};
