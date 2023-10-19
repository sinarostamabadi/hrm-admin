import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const permissionTypeSlice = createSlice({
  name: "permissionType",
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

const { actions, reducer } = permissionTypeSlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
