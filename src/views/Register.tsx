import { useNavigate } from "react-router-dom";
import { Login } from "../components/Login";
import { createNewUser } from "../firebase";
import { LoginInformation } from "../types/react";

export const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (login: LoginInformation) => {
    const userCredential = await createNewUser(login);

    // TODO: Handle register error with toast
    if (!userCredential) return;

    console.log(userCredential);
    navigate("/list");
  };

  return (
    <div>
      <Login onSubmit={handleRegister} isRegister />
    </div>
  );
};
