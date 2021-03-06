import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { COLLECTION_URL } from "../constants";
import { addUser } from "../firebase/api";
import { LoginInformation } from "../types/react";
import { Button } from "./inputs/Button";
import { SubmitButton } from "./inputs/SubmitButton";
import { TextInput } from "./inputs/TextInput";

interface Props {
  onSubmit(login: LoginInformation): void;
  isRegister?: boolean;
}

export const Login = (props: Props) => {
  const { t } = useTranslation();
  const { onSubmit, isRegister } = props;
  const auth = getAuth();
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInformation>();

  useEffect(() => {
    if (error) {
      toast(t("auth.loginFailed"), { type: "error" });
      return;
    }

    if (!user) return;

    const addAndNavigate = async () => {
      await addUser(user);
      navigate(COLLECTION_URL);
    };
    addAndNavigate();
  }, [user, error, navigate, t]);

  return (
    <div className="paper-hover p-4 text-center w-full">
      <h2 className="mb-4">
        {isRegister ? t("auth.register") : t("auth.login")}
      </h2>
      <form
        className="flex flex-col text-left"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="email">{t("auth.email")}</label>
        <TextInput
          className="mb-4"
          type="email"
          id="email"
          error={errors.email?.message}
          {...register("email", { required: "required" })}
        />
        <label htmlFor="password">{t("auth.password")}</label>
        <TextInput
          className="mb-8"
          id="password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "required" })}
        />
        <SubmitButton
          value={isRegister ? t("auth.register") : t("auth.login")}
          className="primary mb-4"
        />
      </form>
      <Button className="secondary w-full" onClick={() => signInWithGoogle()}>
        {t("auth.loginWithGoogle")}
      </Button>
    </div>
  );
};
