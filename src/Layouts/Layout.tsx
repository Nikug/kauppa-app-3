import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="w-content max-w-content">
      <Outlet />
    </div>
  );
};
