import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Layout } from "./Layouts/Layout";
import { Register } from "./views/Register";
import { Collections } from "./views/Collections";
import { Groups } from "./views/Groups";
import { LoginView } from "./views/LoginView";
import { TodoLayout } from "./Layouts/TodoLayout";

function App() {
  return (
    <div className="flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginView />} />
          </Route>
          <Route element={<TodoLayout />}>
            <Route path="/list">
              <Route path="" element={<Collections />} />
              <Route path=":id" element={<Groups />} />
            </Route>

            <Route path="*" element={"Not found"} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
