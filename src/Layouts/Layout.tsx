import { Outlet } from "react-router";
import { NavBar } from "../components/NavBar";

export const Layout = () => {
  return (
    <div className="w-content max-w-content">
      <NavBar />
      <Outlet />
    </div>
  );
};
