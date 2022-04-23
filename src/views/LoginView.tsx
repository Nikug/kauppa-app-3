import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";
import { LoginInformation } from "../types/react";

export const LoginView = () => {
  const auth = getAuth();

  const [signInWithEmailAndPassword, , , error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (login: LoginInformation) => {
    await signInWithEmailAndPassword(login.email, login.password);
  };

  useEffect(() => {
    if (error) {
      toast("Login failed", { type: "error" });
      return;
    }
  }, [error]);

  return (
    <div className="w-full">
      <div className="mb-8">
        <Login onSubmit={handleLogin} />
      </div>
      <div className="mb-4">
        <p className="mb-4">New user? Create an account instead</p>
        <LinkButton className="secondary" href="/register">
          Create an account
        </LinkButton>
      </div>
    </div>
  );
};
