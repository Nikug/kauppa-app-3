import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  redirectPath?: string;
  children: JSX.Element;
}

export const Authenticated = (props: Props) => {
  const { redirectPath, children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate(redirectPath ?? "/", { replace: true });
      }
    });
  }, [navigate, redirectPath]);

  return children;
};
