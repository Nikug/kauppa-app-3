import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";
import { LoginInformation } from "../types/react";

export const LoginView = () => {
  const { t } = useTranslation();
  const auth = getAuth();

  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (login: LoginInformation) => {
    await signInWithEmailAndPassword(login.email, login.password);
  };

  useEffect(() => {
    if (error) {
      toast(t("auth.loginFailed"), { type: "error" });
      return;
    }
  }, [error, t]);

  return (
    <div className="w-full">
      <div className="mb-8">
        <Login onSubmit={handleLogin} />
      </div>
      <div className="mb-4">
        <p className="mb-4">{t("auth.newUserRegisterInstead")}</p>
        <LinkButton className="secondary" href="/register">
          {t("auth.register")}
        </LinkButton>
      </div>
    </div>
  );
};
