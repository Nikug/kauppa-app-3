import { PencilIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { updateCollection } from "../firebase/api";
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
      createModal({
        title: "Edit collection",
        value: collection.name,
        label: "Name",
        okButtonText: "Save",
        onOk: (value) => updateCollection(collection.id, value),
      })
    );
  };

  return (
    <div className="border bg-white p-4 flex justify-between items-center">
      <Link to={collection.url} onClick={() => onSelect(collection.id)}>
        <h2>{collection.name ?? <i>No name</i>}</h2>
        <p>{collection.url}</p>
      </Link>
      <PencilIcon
        className="w-8 h-8 text-icon cursor-pointer"
        onClick={editCollection}
      />
    </div>
  );
};
