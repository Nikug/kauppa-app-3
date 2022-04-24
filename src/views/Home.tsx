import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { LinkButton } from "../components/inputs/LinkButton";
import { COLLECTION_URL } from "../constants";
import { getUsername } from "../utils";

export const Home = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center text-center py-8">
      {user && (
        <div className="flex flex-col align-center mt-8">
          <h2 className="mb-8">Hello {getUsername(user)}!</h2>
          <LinkButton className="primary" href={COLLECTION_URL}>
            Go to your collections
          </LinkButton>
        </div>
      )}
      {!user && (
        <div className="w-full flex flex-col px-32">
          <h1 className="mb-32">Welcome!</h1>
          <LinkButton className="primary mb-6" href="/login">
            Login
          </LinkButton>
          <LinkButton className="secondary" href="/register">
            Create an account
          </LinkButton>
        </div>
      )}
    </div>
  );
};
