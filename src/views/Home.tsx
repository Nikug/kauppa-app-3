import { useNavigate } from "react-router-dom";
import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";
import { loginUser } from "../firebase";
import { LoginInformation } from "../types/react";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogin = async (login: LoginInformation) => {
    const userCredentials = await loginUser(login);

    // TODO: Handle bad login with toast
    if (!userCredentials) return;

    console.log(userCredentials);
    navigate("/list");
  };

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
