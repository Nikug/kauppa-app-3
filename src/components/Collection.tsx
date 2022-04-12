import { UserAddIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { updateCollection } from "../firebase/api";
import { AddUserModal, EditModal } from "../types/modal";
import { TodoCollection } from "../types/todo";

interface Props {
  collection: TodoCollection;
  onSelect(collectionId: string): void;
}

export const Collection = (props: Props) => {
  const { collection, onSelect } = props;
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

  return (
    <div className="border bg-white p-4 flex justify-between items-center">
      <Link to={collection.url} onClick={() => onSelect(collection.url)}>
        <h2>{collection.name ?? <i>No name</i>}</h2>
        <p>{collection.url}</p>
      </Link>
      <UserAddIcon
        className="w-8 h-8 text-icon cursor-pointer"
        onClick={addUserToCollection}
      />
      <PencilIcon
        className="w-8 h-8 text-icon cursor-pointer"
        onClick={editCollection}
      />
    </div>
  );
};
