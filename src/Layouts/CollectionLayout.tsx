import { Outlet, useParams } from "react-router";
import { CollectionNavbar } from "../components/CollectionNavbar";
import { Authenticated } from "../components/Authenticated";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedCollectionWithId } from "../redux/appSlice";
import { getCollections, getSelectedCollection } from "../redux/appSelectors";
import { useEffect } from "react";
import { listenForCollections, listenForGroups } from "../firebase/api";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export const CollectionLayout = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { collectionId } = useParams<{ collectionId: string }>();
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const collections = useAppSelector(getCollections);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenForCollections(user.uid);
    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    if (!collectionId || !user?.uid) return;
    const unsubscribe = listenForGroups(collectionId);
    return unsubscribe;
  }, [collectionId, user?.uid]);

  useEffect(() => {
    if (selectedCollection?.id || !collectionId || !collections) return;
    dispatch(setSelectedCollectionWithId(collectionId));
  }, [collectionId, selectedCollection?.id, dispatch, collections]);

  return (
    <div className="w-content max-w-content min-w-0">
      <Authenticated>
        <>
          <CollectionNavbar />
          <div className="h-content overflow-y-auto">
            <Outlet />
          </div>
        </>
      </Authenticated>
    </div>
  );
};
