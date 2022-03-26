import { LinkButton } from "../components/inputs/LinkButton";
import { Login } from "../components/Login";

export const Home = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-4 mt-2">
        <h1>Kauppa app</h1>
      </div>
      <div className="mb-8">
        <Login onSubmit={() => null} />
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
