import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditModal } from "../types/modal";
import { RootState } from "./store";
import { v1 as uuid } from "uuid";

interface AppState {
  editModals: EditModal[];
}

const initialState: AppState = {
  editModals: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addEditModal: (state, action: PayloadAction<Omit<EditModal, "uid">>) => {
      state.editModals.push({ uid: uuid(), ...action.payload });
    },
    removeEditModal: (state, action: PayloadAction<string>) => {
      state.editModals = state.editModals.filter(
        (modal) => modal.uid !== action.payload
      );
    },
  },
});

export const { addEditModal, removeEditModal } = modalSlice.actions;
export default modalSlice.reducer;

export const getEditModals = (state: RootState) => state.modal.editModals;
