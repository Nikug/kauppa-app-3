import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/Login";
import { LoginInformation } from "../types/react";

export const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [createUserWithEmailAndPassword, user, , error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleRegister = async (login: LoginInformation) => {
    await createUserWithEmailAndPassword(login.email, login.password);
  };

  useEffect(() => {
    // TODO: Handle bad login with toast
    if (error || !user) return;

    navigate("/list");
  }, [user, error, navigate]);

  return (
    <div>
      <Login onSubmit={handleRegister} isRegister />
    </div>
  );
};
