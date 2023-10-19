import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const comapnyPositionGroupSlice = createSlice({
  name: "comapnyPositionGroup",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setEditInfo: (state, action) => {
      state.editInfo = action.payload;
    }
  },
});

const { actions, reducer } = comapnyPositionGroupSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
