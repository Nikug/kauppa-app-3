import { getAuth } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";
import { LoginInformation } from "../types/react";

export const LoginView = () => {
  const auth = getAuth();

  const [signIntWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (login: LoginInformation) => {
    await signIntWithEmailAndPassword(login.email, login.password);
  };

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
