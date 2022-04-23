import { UserAddIcon } from "@heroicons/react/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { removeCollection, updateCollection } from "../firebase/api";
import { AddUserModal, ConfirmationModal, EditModal } from "../types/modal";
import { TodoCollection } from "../types/todo";

interface Props {
  collection: TodoCollection;
  onSelect(collectionId: string): void;
}

export const Collection = (props: Props) => {
  const { collection, onSelect } = props;
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { dispatch } = useModalContext();

  const editCollection = () => {
    dispatch(
      createModal<EditModal>({
        type: "edit",
        title: "Edit collection",
        value: collection.name,
        label: "Name",
        okButtonText: "Save",
        onOk: (value) => updateCollection(collection.url, value),
      })
    );
  };

  const addUserToCollection = () => {
    dispatch(
      createModal<AddUserModal>({
        type: "addUser",
        title: "Add user",
        value: "",
        label: "Email",
        okButtonText: "Add",
        collectionId: collection.url,
      })
    );
  };

  const handleCollectionRemove = () => {
    if (!user) return;
    dispatch(
      createModal<ConfirmationModal>({
        type: "confirmation",
        title: "Remove collection",
        okButtonText: "Remove",
        onOk: () => removeCollection(collection.url, user.uid),
      })
    );
  };

  return (
    <div className="border bg-white p-4 flex justify-between items-center">
      <Link to={collection.url} onClick={() => onSelect(collection.url)}>
        <h2>{collection.name ?? <i>No name</i>}</h2>
        <p>{collection.url}</p>
      </Link>
      <div className="flex justify-end gap-2">
        <UserAddIcon
          className="w-8 h-8 text-icon cursor-pointer"
          onClick={addUserToCollection}
        />
        <PencilIcon
          className="w-8 h-8 text-icon cursor-pointer"
          onClick={editCollection}
        />
        <TrashIcon
          className="w-8 h-8 text-primary cursor-pointer"
          onClick={handleCollectionRemove}
        />
      </div>
    </div>
  );
};
