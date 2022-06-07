import { UserAddIcon } from "@heroicons/react/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { collection, onSelect } = props;
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const { dispatch } = useModalContext();

  const editCollection = () => {
    dispatch(
      createModal<EditModal>({
        type: "edit",
        title: t("modal.editCollection"),
        value: collection.name,
        label: t("modal.name"),
        okButtonText: t("modal.save"),
        onOk: (value) => updateCollection(collection.url, value),
      })
    );
  };

  const addUserToCollection = () => {
    dispatch(
      createModal<AddUserModal>({
        type: "addUser",
        title: t("modal.addUser"),
        value: "",
        label: t("modal.email"),
        okButtonText: t("modal.add"),
        collectionId: collection.url,
        url: `${window.location}/${collection.url}`,
      })
    );
  };

  const handleCollectionRemove = () => {
    if (!user) return;
    dispatch(
      createModal<ConfirmationModal>({
        type: "confirmation",
        title: t("modal.removeCollection"),
        okButtonText: t("modal.remove"),
        onOk: () => removeCollection(collection.url, user.uid),
      })
    );
  };

  return (
    <div className="border bg-white px-4 h-full flex justify-between items-center">
      <Link to={collection.url} onClick={() => onSelect(collection.url)}>
        <h4>{collection.name || <i>{t("general.noName")}</i>}</h4>
        <p className="text-secondary">{collection.url}</p>
      </Link>
      <div className="flex justify-end gap-2">
        <UserAddIcon
          className="w-7 h-7 text-icon cursor-pointer"
          onClick={addUserToCollection}
        />
        <PencilIcon
          className="w-7 h-7 text-icon cursor-pointer"
          onClick={editCollection}
        />
        <TrashIcon
          className="w-7 h-7 text-primary cursor-pointer"
          onClick={handleCollectionRemove}
        />
      </div>
    </div>
  );
};
