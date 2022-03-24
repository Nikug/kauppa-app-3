import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getGroups } from "./redux/appSlice";
import { getGroups as getApiGroups } from "./firebase/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Layout } from "./Layouts/Layout";

function App() {
  const groups = useSelector(getGroups);

  useEffect(() => {
    // getApiGroups("mainRoute");
  }, []);

  return (
    <div className="flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/register" element={"Register"} />

            <Route path="/list">
              <Route path="" element={"Main"} />
              <Route path=":id" element={"Id"} />
            </Route>

            <Route path="*" element={"Not found"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
