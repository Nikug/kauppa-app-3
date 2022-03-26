import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";
import { LoginInformation } from "../types/react";

export const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [signIntWithEmailAndPassword, user, , error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = async (login: LoginInformation) => {
    await signIntWithEmailAndPassword(login.email, login.password);
  };

  useEffect(() => {
    // TODO: Handle bad login with toast
    if (error || !user) return;

    navigate("/list");
  }, [user, error, navigate]);

  return (
    <div className="w-full">
      <div className="text-center mb-4 mt-2">
        <h1>Kauppa app</h1>
      </div>
      <div className="mb-8">
        <Login onSubmit={handleLogin} />
      </div>
      <div>
        <p className="mb-4">New user? Create an account instead</p>
        <LinkButton className="secondary" href="/register">
          Create an account
        </LinkButton>
      </div>
    </div>
  );
};
