import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/inputs/Button";
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
      <div className="mb-8">
        <Login onSubmit={handleLogin} />
      </div>
      <div className="mb-4">
        <p className="mb-4">New user? Create an account instead</p>
        <LinkButton className="secondary" href="/register">
          Create an account
        </LinkButton>
      </div>
      <div>
        <Button onClick={() => signOut(auth)} className="primary">
          Logout
        </Button>
      </div>
    </div>
  );
};
