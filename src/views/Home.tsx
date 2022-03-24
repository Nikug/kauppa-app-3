import { Login } from "../components/Login";

export const Home = () => {
  return (
    <div className="w-full">
      <div className="text-center mb-4 mt-2">
        <h1>Kauppa app</h1>
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};
