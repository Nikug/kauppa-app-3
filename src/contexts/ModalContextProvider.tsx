import { createContext, ReactNode, useContext, useReducer } from "react";
import { EditModal, ModalAction, ModalContextState } from "../types/modal";
import { v1 as uuid } from "uuid";

// Type guards
const isCreateAction = (
  action: ModalAction<unknown>
): action is ModalAction<EditModal> => action.type === "create";
const isRemoveAction = (
  action: ModalAction<unknown>
): action is ModalAction<string> => action.type === "remove";

// Context
const ModalContext = createContext<ModalContextState>({
  modals: [],
  dispatch: () => {},
});
export const useModalContext = () => useContext(ModalContext);

// Reducer
const modalReducer = (state: EditModal[], action: ModalAction<unknown>) => {
  if (isCreateAction(action)) {
    return [...state, action.payload];
  } else if (isRemoveAction(action)) {
    return state.filter((modal) => modal.uid !== action.payload);
  } else {
    throw new Error("Unknown action type");
  }
};

// Actions
export const createModal = (
  modal: Omit<EditModal, "uid">
): ModalAction<EditModal> => ({
  type: "create",
  payload: { uid: uuid(), ...modal },
});
export const removeModal = (uid: string): ModalAction<string> => ({
  type: "remove",
  payload: uid,
});

// Provider
interface Props {
  children?: ReactNode;
}

export const ModalContextProvider = (props: Props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(modalReducer, []);

  return (
    <ModalContext.Provider value={{ modals: state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
