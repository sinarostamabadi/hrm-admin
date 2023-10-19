import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {},
  editInfo: {}
}

const countrySlice = createSlice({
  name: "country",
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

const { actions, reducer } = countrySlice;
export const { setInfo, setEditInfo } = actions;
export default reducer;
