import { Outlet, useParams } from "react-router";
import { GroupNavbar } from "../components/GroupNavbar";
import { Authenticated } from "../components/Authenticated";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSelectedCollectionWithId,
  setSelectedGroup,
} from "../redux/appSlice";
import { getCollections, getSelectedCollection } from "../redux/appSelectors";
import { useEffect } from "react";
import { listenForGroups } from "../firebase/api";

export const GroupLayout = () => {
  const { collectionId, groupId } = useParams<{
    collectionId: string;
    groupId: string;
  }>();
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const collections = useAppSelector(getCollections);

  useEffect(() => {
    if (!collectionId) return;
    const unsubscribe = listenForGroups(collectionId);
    return unsubscribe;
  }, [collectionId]);

  useEffect(() => {
    if (selectedCollection?.id || !collectionId) return;
    dispatch(setSelectedCollectionWithId(collectionId));
  }, [collectionId, selectedCollection?.id, dispatch, collections]);

  useEffect(() => {
    if (selectedCollection?.id || !collectionId || !groupId) return;
    dispatch(setSelectedGroup(groupId));
  }, [collectionId, selectedCollection?.id, dispatch, collections, groupId]);

  return (
    <div className="w-content max-w-content min-w-0">
      <Authenticated>
        <>
          <GroupNavbar />
          <Outlet />
        </>
      </Authenticated>
    </div>
  );
};
