import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/Login";
import { addUser } from "../firebase/api";
import { LoginInformation } from "../types/react";

export const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);

  const handleRegister = async (login: LoginInformation) => {
    await createUserWithEmailAndPassword(login.email, login.password);
  };

  useEffect(() => {
    if (error || !user) {
      // TODO: Handle bad login with toast
      return;
    }
    const addAndNavigate = async () => {
      await addUser(user);
      navigate("/list");
    };
    addAndNavigate();
  }, [user, error, navigate]);

  return (
    <div>
      <Login onSubmit={handleRegister} isRegister />
    </div>
  );
};
