import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";
import { LoginInformation } from "../types/react";

export const LoginView = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [signIntWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (login: LoginInformation) => {
    await signIntWithEmailAndPassword(login.email, login.password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
