import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const inventoryTypeSlice = createSlice({
  name: "inventoryType",
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

const { actions, reducer } = inventoryTypeSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
