import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const NavBar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <div className="sticky top-0 h-16 bg-primary text-white flex items-center px-4 justify-between">
      <h2 className="font-bold">Nav bar</h2>
      <h4>{user?.email}</h4>
    </div>
  );
};
