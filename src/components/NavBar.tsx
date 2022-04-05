import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getNameFromEmail } from "../utils";
import { Dropdown } from "./Dropdown";

export const NavBar = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="sticky top-0 h-16 bg-primary text-white flex items-center px-4 justify-between">
      <div>
        <a className="font-bold text-white text-3xl" href="/">
          Kauppa App
        </a>
      </div>
      {user && (
        <div className="font-semibold">
          <Dropdown value={user?.displayName || getNameFromEmail(user.email)}>
            <option onClick={logout}>Logout</option>
          </Dropdown>
        </div>
      )}
    </div>
  );
};
