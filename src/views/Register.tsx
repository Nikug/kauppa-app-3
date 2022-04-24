import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Login } from "../components/Login";
import { COLLECTION_URL } from "../constants";
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
    if (error) {
      toast("Registration failed", { type: "error" });
      return;
    }

    if (!user) return;

    const addAndNavigate = async () => {
      await addUser(user);
      navigate(COLLECTION_URL);
    };
    addAndNavigate();
  }, [user, error, navigate]);

  return (
    <div>
      <Login onSubmit={handleRegister} isRegister />
    </div>
  );
};
