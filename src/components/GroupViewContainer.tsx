import { useParams } from "react-router-dom";
import { getSelectedGroup } from "../redux/appSelectors";
import { useAppSelector } from "../redux/hooks";
import { GroupView } from "../views/GroupView";

export const GroupViewContainer = () => {
  const { collectionId } = useParams<{
    collectionId: string;
    groupId: string;
  }>();
  const group = useAppSelector(getSelectedGroup);

  return (
    <>
      {group && collectionId && (
        <GroupView group={group} collectionId={collectionId} />
      )}
    </>
  );
};
