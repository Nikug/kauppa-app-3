import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Layout } from "./Layouts/Layout";
import { Register } from "./views/Register";
import { Authenticated } from "./components/Authenticated";
import { Collections } from "./views/Collections";
import { Groups } from "./views/Groups";
import { LoginView } from "./views/LoginView";

function App() {
  return (
    <div className="flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginView />} />

            <Route path="/list">
              <Route
                path=""
                element={
                  <Authenticated>
                    <Collections />
                  </Authenticated>
                }
              />
              <Route
                path=":id"
                element={
                  <Authenticated>
                    <Groups />
                  </Authenticated>
                }
              />
            </Route>

            <Route path="*" element={"Not found"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
