import { Outlet, useParams } from "react-router";
import { TodoNavBar } from "../components/TodoNavBar";
import { Authenticated } from "../components/Authenticated";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getCollections,
  getSelectedCollection,
  setSelectedCollectionWithUrl,
} from "../redux/appSlice";
import { useEffect } from "react";
import { listenForCollections, listenForGroups } from "../firebase/api";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export const TodoLayout = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { id: collectionUrl } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const collections = useAppSelector(getCollections);

  useEffect(() => {
    if (!selectedCollection?.id) return;
    const unsubscribe = listenForGroups(selectedCollection.id);
    return unsubscribe;
  }, [selectedCollection?.id]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    if (selectedCollection?.id || !collectionUrl || !collections) return;
    dispatch(setSelectedCollectionWithUrl(collectionUrl));
  }, [collectionUrl, selectedCollection?.id, dispatch, collections]);

  return (
    <div className="w-content max-w-content min-w-0">
      <Authenticated>
        <>
          <TodoNavBar />
          <Outlet />
        </>
      </Authenticated>
    </div>
  );
};
