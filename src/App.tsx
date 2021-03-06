import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Layout } from "./Layouts/Layout";
import { Register } from "./views/Register";
import { Collections } from "./views/Collections";
import { Groups } from "./views/Groups";
import { LoginView } from "./views/LoginView";
import { CollectionLayout } from "./Layouts/CollectionLayout";
import { ModalContainer } from "./components/Modal/ModalContainer";
import { ModalContextProvider } from "./contexts/ModalContextProvider";
import { ToastContainer, Zoom } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { COLLECTION_URL } from "./constants";
import { Suspense } from "react";
import { Options } from "./components/Options";
import { useAppSelector } from "./redux/hooks";
import { getShowOptions } from "./redux/appSlice";
import { UserSettingsContainer } from "./components/UserSettingsContainer";
import { GroupView } from "./views/GroupView";
import { GroupLayout } from "./Layouts/GroupLayout";

function App() {
  const showOptions = useAppSelector(getShowOptions);

  return (
    <Suspense fallback="Loading...">
      <div className="flex justify-center relative">
        <UserSettingsContainer>
          <ModalContextProvider>
            <ModalContainer />
            {showOptions && <Options />}
            {!showOptions && (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<LoginView />} />
                  </Route>

                  <Route element={<CollectionLayout />}>
                    <Route path={COLLECTION_URL}>
                      <Route path="" element={<Collections />} />
                      <Route path=":collectionId" element={<Groups />} />
                    </Route>
                  </Route>

                  <Route element={<GroupLayout />}>
                    <Route path={COLLECTION_URL}>
                      <Route
                        path=":collectionId/:groupId"
                        element={<GroupView />}
                      />
                    </Route>
                  </Route>

                  <Route path="*" element={"Not found"} />
                </Routes>
              </BrowserRouter>
            )}
            <ToastContainer
              position="bottom-center"
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              limit={3}
              transition={Zoom}
            />
          </ModalContextProvider>
        </UserSettingsContainer>
      </div>
    </Suspense>
  );
}

export default App;
