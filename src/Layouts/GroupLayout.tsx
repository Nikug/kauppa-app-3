import { Outlet, useParams } from "react-router";
import { GroupNavbar } from "../components/GroupNavbar";
import { Authenticated } from "../components/Authenticated";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setSelectedCollectionWithUrl,
  setSelectedGroup,
} from "../redux/appSlice";
import { getCollections, getSelectedCollection } from "../redux/appSelectors";
import { useEffect } from "react";
import { listenForGroups } from "../firebase/api";

export const GroupLayout = () => {
  const { collectionId: collectionUrl, groupId } = useParams<{
    collectionId: string;
    groupId: string;
  }>();
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const collections = useAppSelector(getCollections);

  useEffect(() => {
    if (!collectionUrl) return;
    const unsubscribe = listenForGroups(collectionUrl);
    return unsubscribe;
  }, [collectionUrl]);

  useEffect(() => {
    if (selectedCollection?.url || !collectionUrl) return;
    dispatch(setSelectedCollectionWithUrl(collectionUrl));
  }, [collectionUrl, selectedCollection?.url, dispatch, collections]);

  useEffect(() => {
    if (selectedCollection?.url || !collectionUrl || !groupId) return;
    dispatch(setSelectedGroup(groupId));
  }, [collectionUrl, selectedCollection?.url, dispatch, collections, groupId]);

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
