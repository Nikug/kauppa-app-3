import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/solid";
import { getAuth } from "firebase/auth";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { COLLECTION_URL } from "../constants";
import { createModal, useModalContext } from "../contexts/ModalContextProvider";
import { addCollection, addGroup } from "../firebase/api";
import { setSelectedCollection, setSelectedGroup } from "../redux/appSlice";
import { getCollections, getSelectedCollection } from "../redux/appSelectors";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EditModal } from "../types/modal";
import { Api, TodoCollection, TodoGroup } from "../types/todo";
import { Dropdown } from "./Dropdown";
import { TextButton } from "./inputs/TextButton";

const createNewCollection = (): Api<TodoCollection> => ({
  name: "",
});

export const createNewGroup = (): Api<TodoGroup> => ({
  name: "",
});

export const navClasses = `
  sticky
  top-0
  h-20
  bg-primary
  text-white
  flex
  flex-col
  items-center
`;

export const CollectionNavbar = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const selectedCollection = useAppSelector(getSelectedCollection);
  const collections = useAppSelector(getCollections);
  const { dispatch: modalDispatch } = useModalContext();
  const navigate = useNavigate();

  const collectionList: TodoCollection[] = useMemo(() => {
    if (!collections) return [];
    return Object.entries(collections).map(([id, collection]) => ({
      id,
      ...collection,
    }));
  }, [collections]);

  const createCollection = () => {
    if (!user) return;
    const newCollection = createNewCollection();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: t("modal.createCollection"),
        label: t("modal.name"),
        okButtonText: t("modal.save"),
        onOk: (value) => addCollection(user, { ...newCollection, name: value }),
      })
    );
  };

  const createGroup = () => {
    if (!selectedCollection) return;
    const newGroup = createNewGroup();
    modalDispatch(
      createModal<EditModal>({
        type: "edit",
        title: t("modal.createList"),
        label: t("modal.name"),
        okButtonText: t("modal.save"),
        value: newGroup.name,
        onOk: async (value) => {
          await addGroup(selectedCollection.id, {
            ...newGroup,
            name: value,
          });
        },
      })
    );
  };

  const handleCollectionSelect = (collectionId: string) => {
    dispatch(setSelectedGroup(null));
    dispatch(setSelectedCollection(collectionId));
    navigate(`${COLLECTION_URL}/${collectionId}`);
  };

  const onBack = () => {
    dispatch(setSelectedGroup(null));
    dispatch(setSelectedCollection(null));
  };

  return (
    <div className={navClasses}>
      <h4 className="h-8 font-bold flex items-center">
        {selectedCollection ? t("list.title") : t("collection.title")}
      </h4>
      <div className="h-12 w-full px-2 flex justify-between items-center">
        <Link
          className="font-bold text-white text-xl truncate flex-1"
          to={selectedCollection ? COLLECTION_URL : "/"}
          onClick={onBack}
        >
          {selectedCollection ? (
            <ArrowLeftIcon className="w-7 h-7" />
          ) : (
            <HomeIcon className="w-7 h-7" />
          )}
        </Link>
        <div className="font-semibold text-xl flex-1 flex justify-center">
          <Dropdown
            value={
              selectedCollection
                ? selectedCollection.name || t("general.noName")
                : t("collection.select")
            }
          >
            {collectionList.map((collection) => (
              <div
                key={collection.id}
                onClick={() => handleCollectionSelect(collection.id)}
              >
                {collection.name || t("general.noName")}
              </div>
            ))}
          </Dropdown>
        </div>
        {user && selectedCollection && (
          <div className="flex-1 text-right">
            <TextButton onClick={createGroup}>{t("list.add")}</TextButton>
          </div>
        )}
        {user && !selectedCollection && (
          <div className="flex-1 text-right">
            <TextButton onClick={createCollection}>
              {t("collection.add")}
            </TextButton>
          </div>
        )}
      </div>
    </div>
  );
};
